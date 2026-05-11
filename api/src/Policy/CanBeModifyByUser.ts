import { ActorUserAdmin } from "../dbConfig/configApp";

export default function canModifyUser(actor:ActorUserAdmin, targetUserId: number) {

  console.log("aaaaaaaaaaaccccccc ",actor )
    return actor.actorRole === "admin" || actor.actorRole === "ADMIN" || actor.actorId === targetUserId;
  }
  