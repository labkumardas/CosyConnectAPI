// service/global/globalService.js
"use strict";
import userModel from '../../model/userModel.js';
import profileImageModel from '../../model/profileImageModel.js';
import userSettingModel from '../../model/userSettingModel.js';
import roleModel from '../../model/roleModel.js';
import userReportModel from '../../model/userReportModel.js';

import fs from 'fs';
import mongoose from "mongoose";

class userRepository {
  constructor() {

  }
  async findPhone(phone, userId) {

    // const existingUser = await userModel.findOne({ $or: [{ phone }, { _id: { $ne: userId }, phone: phone }] });
    let existingUser
    if (phone != undefined && userId != undefined) {
      existingUser = await userModel.findOne({ _id: { $ne: userId }, phone: phone });

    } else if (phone != undefined) {
      existingUser = await userModel.findOne({ phone });
    }
    return !!existingUser;
  }

  async findEmail(email, userId) {
    // const existingUser = await userModel.findOne({ $or: [{ email }, { _id: { $ne: userId }, email: email }] });

    let existingUser
    if (email != undefined && userId != undefined) {
      existingUser = await userModel.findOne({ _id: { $ne: userId }, email: email });
    } else if (email != undefined) {
      existingUser = await userModel.findOne({ email, });

      // if (existingUser.isDeleted === true) {
      //   return false;
      // }

    }

    return !!existingUser;
  }

  async findUserName(username, userId) {

    // const existingUser = await userModel.findOne({ $or: [{ username }, { _id: { $ne: userId }, username: username }] });

    let existingUser
    if (username != undefined && userId != undefined) {
      existingUser = await userModel.findOne({ _id: { $ne: userId }, username: username });
    } else if (username != undefined) {
      // console.log('onlyusername')
      existingUser = await userModel.findOne({ username });
    }

    return !!existingUser;
  }

  async insertUser(userData) {
    try {
      let fineRole = await roleModel.findOne({ _id: userData.role_id })
      userData = {
        ...userData, role: fineRole.role
      }
      return userModel.create(userData);
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async updateUserDate(userData, user_id) {

    const { username, first_name, last_name, phone, email, password, dob } = userData;

    try {

      const existingUser = await userModel.findOne({ _id: user_id, email: email });

      if (existingUser) delete userData.email;

      const existingUserName = await userModel.findOne({ _id: user_id, username: username });

      if (existingUserName) delete userData.username;
      const existingUserPhone = await userModel.findOne({ _id: user_id, phone: phone });
      if (existingUserPhone) delete userData.phone;
      let updatedUser = await userModel.findOneAndUpdate({ _id: user_id, }, { $set: { ...userData } },
        { new: true },);
      return updatedUser
    }
    catch (error) {
      throw new Error(error)
    }
  }


  async isUserSettingExists(user_id) {
    const existingSetting = await userSettingModel.findOne({ user_id });
    return !!existingSetting;
  }

  async findAndUpdate(filter, updateData) {
    try {
      const result = await userSettingModel.findOneAndUpdate(filter, updateData, { new: true });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async insertSettingData(data) {
    try {
      return await userSettingModel.create(data)
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateImage(url, userid) {
    console.log('url', url, userid)
    try {
      const insert = await userModel.findOneAndUpdate({ _id: userid, }, { $set: { profile_image: url } }, { new: true });
      return insert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadImage(insertArry) {
    try {
      const insert = await profileImageModel.create(insertArry);
      return insert;

    } catch (error) {
      throw new Error(error);
    }
  }


  async deleteImage(photo, userid) {
    try {
      let promises = photo.map(async (file) => {
        let delprof = await profileImageModel.findOne({
          user_id: userid,
          name: file
        })
        // console.log('file', file, delprof)
        if (delprof) {
          fs.unlink("./public/uploads/" + delprof.name, function (err) {
            if (err) return console.log(err);
            console.log("File deleted!");
          });
        }
        await profileImageModel.findOneAndDelete({
          user_id: userid,
          name: file
        })
      })

      const results = await Promise.all(promises);
      return;

    } catch (error) {
      throw new Error(error);
    }
  }



  async getProfileList(user_id) {
    try {

      let finlockdBed = await userReportModel.find({ reportBy: user_id })
      let findBlockedMe = await userReportModel.find({ profile_id: user_id })

      let user = [...new Set(findBlocked.map((item) => item.profile_id))]
      let userme = [...new Set(findBlockedMe.map((item) => item.reportBy))]

      const result = await userModel.aggregate([
        {
          $match: {
            _id: { $ne: new mongoose.Types.ObjectId(user_id), $nin: [...user, ...userme] },
            role: { $ne: "Admin" },
            isBlocked: false, isActive: true, isAdminBlocked: false,
            isProfile: "public"
          }
        },
        {
          $lookup: {
            from: 'userreviews',
            localField: '_id',
            foreignField: 'user_id',
            as: 'userReviews'
          }
        },
        {
          $lookup: {
            from: 'usersettings',
            localField: '_id',
            foreignField: 'user_id',
            as: 'userSetting'
          }
        },
        {
          $lookup: {
            from: 'profileimages',
            localField: '_id',
            foreignField: 'user_id',
            as: 'profileImages'
          }
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'role_id',
            foreignField: '_id',
            as: 'userRole'
          }
        },
        {
          $unwind: {
            path: "$userReviews",               // Unwind the result array
            includeArrayIndex: "arrayIndex",   // Include array index in the result
            preserveNullAndEmptyArrays: true   // Preserve null and empty arrays
          }
        },
        {
          $unwind: {
            path: "$userSetting",
            includeArrayIndex: "arrayIndex",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: "$profileImages",
            includeArrayIndex: "arrayIndex",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: "$userRole",
            includeArrayIndex: "arrayIndex",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            first_name: 1,
            last_name: 1,
            dob: 1,
            city: 1,
            userRole: { role: 1 },
            userReviews: {
              reviewBy: 1,
              description: 1,
              rating: 1
            },
            userSetting: {
              about_user: 1
            },
            profileImages: {
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


  async findUserMeta(profileId) {
    try {
      return await userSettingModel.findOne({ user_id: profileId }).select('-__v');
    } catch (error) {
      throw new Error(error);
    }
  }

  async insertProfileBlockData(data) {
    try {
      return await userReportModel.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserIdByUsername(id) {
    try {
      const user = await userModel.findById(id).select('id username').exec();
      return user ? user.username : null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delProfile(user_id) {
    try {
      const user = await userModel.findOneAndUpdate({ _id: user_id, }, { isDeleted: true, dob: null, profile_image: null, email: null, username: null, phone: null, password: null }, { new: true })
      return user
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkIsProfile(userId, data) {
    try {
      const user = await userModel.findOne({ _id: userId, isProfile: data.isProfile, })
      return user
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateIsProfile(userId, data) {
    try {
      const user = await userModel.findOneAndUpdate({ _id: userId, }, { isProfile: data.isProfile }, { new: true })
      return user
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new userRepository();