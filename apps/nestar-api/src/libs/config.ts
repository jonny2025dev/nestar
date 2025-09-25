import { ObjectId } from 'bson';

export const availableAgentSorts = ["createdAt","updatedAt","memberLikes","memberView","memberRank"]

export const availableMemberSorts = ["createdAt", "updatedAt", "memberLikes", "memberView",]

export const shapeIntoMongoObjectId = (target: any) => {
	return typeof target === 'string' ? new ObjectId(target) : target;
};
