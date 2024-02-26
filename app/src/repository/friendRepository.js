"use strict";
import userModel from '../../model/userModel.js';
import userSettingModel from '../../model/userSettingModel.js';
import daterBudgetModel from "../../model/daterBudgetModel.js"
import clientBillModel from "../../model/clientBillModel.js"
import friendRequestModel from '../../model/friendRequestModel.js';
import mongoose from "mongoose";

class friendRepository {
  constructor() {
    //
  }


  async friendcheck(client_id, dater_id) {

    try {
      let arrData = await friendRequestModel.findOne({ $or: [{ senderId: client_id, receiverId: dater_id }, { senderId: dater_id, receiverId: client_id }], status: "accepted" });
      return arrData
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async alreadyfriendrequest(client_id, dater_id) {
    console.log('PP', client_id, dater_id)
    try {
      let arrData = await friendRequestModel.findOne({ $or: [{ senderId: client_id, receiverId: dater_id }, { senderId: dater_id, receiverId: client_id }], });
      console.log('arr>>>>', arrData,)
      return arrData
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async getFriendList(user_id) {
    try {
      const result = await friendRequestModel.aggregate([
        {

          $match: {
            $or: [{ senderId: new mongoose.Types.ObjectId(user_id), }, { receiverId: new mongoose.Types.ObjectId(user_id) }],
            status: "accepted"
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'receiverId',
            foreignField: '_id',
            as: 'receiverUser'
          }
        },

        {
          $lookup: {
            from: 'users',
            localField: 'senderId',
            foreignField: '_id',
            as: 'senderUser'
          }
        },
        // { $unwind: "$receiverUser" }, // Unwind the result array
        // { $unwind: "$senderUser" }, // Unwind the result array
        {
          $unwind: {
            path: "$receiverUser",               // Unwind the result array
            includeArrayIndex: "arrayIndex",   // Include array index in the result
            preserveNullAndEmptyArrays: true   // Preserve null and empty arrays
          }
        },
        {
          $unwind: {
            path: "$senderUser",
            includeArrayIndex: "arrayIndex",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            status: 1,
            receiverUser: {
              first_name: 1,
              last_name: 1,
              profile_image: 1
            },
            senderUser: {
              first_name: 1,
              last_name: 1,
              profile_image: 1
            }
          }
        }
      ]);
      return result;
    } catch (error) {
      console.error("getProfileList", error)
      throw new Error(error);
    }
  }


  async getPeopleAroundList(user_id, user_role) {
    try {
      console.log('user_role', user_role)
      let role = user_role
      const userResult = await userSettingModel.aggregate([
        {
          $match: {
            user_id: { $ne: new mongoose.Types.ObjectId(user_id) },
            address: { $exists: true }, // Include only documents where the 'address' key exists
          }
        },
        {
          $lookup: {
            from: 'users',
            let: { userId: '$user_id', role: { $toLower: role } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$userId'] },
                      { $eq: [{ $toLower: '$role' }, '$$role'] },
                      { $eq: ['$isAdminBlocked', false] },
                      { $eq: ['$isDeleted', false] }
                    ]
                  }
                }
              },
            ],
            as: 'userData'
          }
        },
        {
          $unwind: {
            path: "$userData",
            includeArrayIndex: "arrayIndex",
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $project: {
            user_id: 1,
            profile_distance: 1,
            address: 1,
            userData: {
              first_name: 1,
              last_name: 1,
              profile_image: 1,
              username: 1,
              role: 1
            },
          }
        }
      ]);

      // Simulate MongoDB query result
      let findUserResult = await userSettingModel.findOne({ user_id: user_id });

      // Create a regular expression for partial matching
      let addressRegex = new RegExp(findUserResult.address, 'i'); // 'i' for case-insensitive matching

      // Filter userResult array based on partial match
      let filteredUserResult = userResult.filter(user => {
        console.log('user', user.user_id, typeof Number(user.profile_distance), typeof findUserResult.profile_distance)
        return (
          addressRegex.test(user.address) &&
          (Number(user.profile_distance) <= Number(findUserResult.profile_distance))
        );
      });


      return filteredUserResult;
    } catch (error) {
      console.error("getProfileList", error)
      throw new Error(error);
    }
  }












}

export default new friendRepository();