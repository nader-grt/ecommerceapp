import EmployeesDomain from "../../models/domain/EmployeeDomain/EmployeeDomain";
import { Employee, sequelize, User } from "../../models/main";
import IEmployeeRepoInterface from "./IEmployeeRepoInterface";
import { Op, fn, col, Transaction } from "sequelize";

export default class EmployeeRepo extends IEmployeeRepoInterface
{


    public async createEmployee(emp:any,userId:number):Promise<any> 
    {

        try {
                
          //  console.log("emp into repo  ",emp)
            await  Employee.create({
                
                    salary: emp.salary,
                    hiredAt: emp.hiredAt,
                    userId: userId,
                  
            })
         } catch (error) {
            console.log(error) ;
            
         }
    }




   public async updateEmployee(employee: EmployeesDomain) {

    const t = await sequelize.transaction()
         try {
        const result:any =   await Employee.update(
            employee.toPersistence(),
            
            { 
              where: { id: employee.empid } ,
              transaction:t
          
    
          }
          );
          const emp = await Employee.findByPk(employee.empid, {
            raw: true,
            transaction:t
          });
          await t.commit()
        return emp 
         } catch (error) {
            console.log(error)
            await t.rollback()
         }
    }
   
   
   
    public async getEmployeeById(id :number):Promise<any> 
    {
        

        try {
            
       


                 const record = await Employee.findByPk(id);
                 if (!record) return null;
               
                 return new EmployeesDomain({
                   employeeId: record.id,
                   salary: record.salary,
                   hiredAt: record.hiredAt,
                   userId: record.userId,
                 });
          
        } catch (error) {
            
        }
          
    }

     static async FindEmployeeById(id:number):Promise<any>
     {
     
        const  emp  =  await  Employee.findOne( { where: { id: id } } ) ;
            try {
              if (!emp) return null;
        
                const e = emp?.get({ plain: true });

                return {
                 // employeeId: e.id,
                  salary: e.salary,
                 // user: e.userId,
                  hiredDate: e.hiredAt
                };
            } catch (error) {
                
            }

     }

     public async deleteEmployee(id:number,userid?:number):Promise<any> 
     {
               const t = await sequelize.transaction();

           
          try {
       

                            const emp = await Employee.destroy(
                              {
                                where: { id: id },
                                transaction: t
                              }
                            );
                                 await User.destroy(
                                  {
                                    where :{id:userid},
                                
                                    transaction: t
                                })
          //  console.log("empppppppppp")
            await t.commit();
          } catch (error) {
            await t.rollback();
          }

     }

//   type: Sequelize.ENUM('user', 'admin','supplier','deliverer','secrtrie'),

public static async FindAllIdsExistWithEmp(): Promise<number[]> {

  const users = await User.findAll({
    attributes: [
      [fn('DISTINCT', col('id')), 'id']
    ],
    where: {
      role: {
        [Op.in]: ['deliverer', 'secrtrie']
      }
    },
    raw: true
  });

 
  return users.map((u: any) => u.id);
}


public  async FindEmployeeBefore(userId?:number ,dayWorkid?:number):Promise<boolean | any>
{
             try {
                const exists = await Employee.findOne({
                    where: {
                      userId:userId,
                      
                    },
                  });
                return exists ? true :false
             } catch (error) {
                console.log(error)
             }
                
}


public static async FindEmployeeBeforeByEmpId(empId?:number ,dayWorkid?:number):Promise<boolean | any>
{
             try {
                const exists = await Employee.findOne({
                    where: {
                      id:empId,
                      
                    },
                  });
                return exists ? true :false
             } catch (error) {
                console.log(error)
             }
                
}


     public  static  async  getEmpUsersByRole(role: string):Promise<any> {
      
        const RoleName = role.charAt(0).toUpperCase() + role.slice(1);
      
        const users = await User.findAll({
          attributes: [
            ['id', `${RoleName}Id`],
            ['role', `${RoleName}Role`],
          ],
          where: {
            role: role,
          },
          raw: true,
        });
      
        return users;
      }

      public async FindUserById(userId:number):Promise<any>
      {

                 try {
                   const user =          await User.findOne({
                              where:{id:userId},
                              raw:true 
                            })

                            return user ;
                 } catch (error) {
                  console.log(Error)
                 }

      }
      
}