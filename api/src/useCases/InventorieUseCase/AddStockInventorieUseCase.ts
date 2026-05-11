import InventorieRepo from "../../repo/InventorieRepo/InventorieRepo";
import InventoryMovementRepo from "../../repo/MovementRepo/InventoryMovementRepo";
import VariantProductRepo from "../../repo/VariantProductRepo/VariantProductRepo";
import InventorieDomain from "../../models/domain/InventorieDomain/InventorieDomain";
import { InventoryPolicy } from "../../Policy/InventoryPolicy";
import sequelize from "../../dbConfig/config";

export default class AddStockInventorieUseCase {
  private _variantProductRepo: VariantProductRepo;
  private _InventorieRepo: InventorieRepo;
  private _inventoryMovement: InventoryMovementRepo;

  constructor(
    inventorieRepo: InventorieRepo,
    variantProductRepo: VariantProductRepo,
    inventoryMovement: InventoryMovementRepo
  ) {
    this._InventorieRepo = inventorieRepo;
    this._variantProductRepo = variantProductRepo;
    this._inventoryMovement = inventoryMovement;
  }

  async execute(dto: any, user: any): Promise<any> {
    const { variantId, warehouseId, quantity } = dto;

    // ================================
    // 1. VALIDATION
    // ================================
    if (!variantId || !warehouseId) {
      throw new Error("variantId and warehouseId are required");
    }

    if (quantity <= 0) {
      throw new Error("Invalid quantity");
    }

    // ================================
    // 2. CHECK VARIANT
    // ================================
    const variant = await this._variantProductRepo.getVariantById(variantId);
    if (!variant) {
      throw new Error("Variant not found");
    }

    // ================================
    // 3. TRANSACTION
    // ================================
    return await sequelize.transaction(async (transaction: any) => {
      try {
        // ================================
        // 4. GET OR CREATE INVENTORY
        // ================================
        let inventory =
          await this._InventorieRepo.findByVariantAndWarehouse(
            variantId,
            warehouseId,
            transaction
          );

        if (!inventory) {
          inventory = await this._InventorieRepo.create(
            {
              variantId,
              warehouseId,
              companyId: variant.companyId,
              quantity: 0,
              reserved: 0,
            },
            transaction
          );
        }

        // ================================
        // 5. POLICY
        // ================================
        InventoryPolicy.canAccess(user, inventory.companyId);

        // ================================
        // 6. DOMAIN
        // ================================
        const domain = new InventorieDomain({
          id: inventory.id,
          variantId: inventory.variantId,
          warehouseId: inventory.warehouseId,
          companyId: inventory.companyId, //  FIX
          quantity: inventory.quantity,
          reserved: inventory.reserved,
        });

        domain.addStock(quantity, user.id);

        // ================================
        // 7. SAVE INVENTORY
        // ================================
        await this._InventorieRepo.update(
          inventory.id,
          {
            quantity: domain.quantity,
            reserved: domain.reserved,
          },
          transaction
        );

        // ================================
        // 8. SAVE MOVEMENTS
        // ================================
        const movements = domain.pullMovements(); //  FIX

        if (movements.length > 0) {
          await this._inventoryMovement.bulkCreate(
            movements.map((m: any) => m.data), // أو m.toJSON()
            transaction
          );
        }

        return {
          message: "Stock added successfully",
          data: domain.toJSON(),
        };

      } catch (error: any) {

        // ================================
        // 9. RACE CONDITION
        // ================================
        if (error.name === "SequelizeUniqueConstraintError") {
          const inventory =
            await this._InventorieRepo.findByVariantAndWarehouse(
              variantId,
              warehouseId,
              transaction
            );

          InventoryPolicy.canAccess(user, inventory.companyId);

          const domain = new InventorieDomain({
            id: inventory.id,
            variantId: inventory.variantId,
            warehouseId: inventory.warehouseId,
            companyId: inventory.companyId, //  FIX
            quantity: inventory.quantity,
            reserved: inventory.reserved,
          });

          domain.addStock(quantity, user.id);

          await this._InventorieRepo.update(
            inventory.id,
            {
              quantity: domain.quantity,
              reserved: domain.reserved,
            },
            transaction
          );

          const movements = domain.pullMovements(); // ✅ FIX

          if (movements.length > 0) {
            await this._inventoryMovement.bulkCreate(
              movements.map((m: any) => m.data),
              transaction
            );
          }

          return {
            message: "Stock added after race condition",
            data: domain.toJSON(),
          };
        }

        throw error;
      }
    });
  }
}