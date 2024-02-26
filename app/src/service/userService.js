// service/global/globalService.js
"use strict";
import bcrypt from 'bcryptjs';
import globalHelper from '../../helper/globalHelper.js';
import userRepository from '../repository/userRepository.js';
import friendRepository from '../repository/friendRepository.js';
class userService {
    constructor() {
        this.helper = new globalHelper();
    }

    async isPhoneExists(phone, userId) {
        const existingUser = await userRepository.findPhone(phone, userId);
        return !!existingUser;
    }

    async isEmailExists(email, userId) {
        const existingUser = await userRepository.findEmail(email, userId);
        return !!existingUser;
    }

    async isUsernameExists(username, userId) {

        const existingUser = await userRepository.findUserName(username, userId);
        return !!existingUser;
    }

    async createUser(data) {

        const userData = {
            role_id: data.role_id,
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username.toLowerCase(),
            phone: data.phone,
            email: data.email,
            password: bcrypt.hashSync(data.password, 8),
            dob: data.dob,
            isActive: true,
            isBlocked: false,

        }
        try {
            return await userRepository.insertUser(userData);
        }
        catch (error) {
            throw new Error(error)
        }
    }

    async updateUser(data, user_id) {

        // Extract only relevant fields
        const { username, first_name, last_name, phone, email, password, dob } = data;

        // Create userData object
        const userData = {
            username: username.toLowerCase(), // Convert username to lowercase
            first_name,
            last_name,
            phone,
            email,
            password: bcrypt.hashSync(password, 8), // Assuming bcrypt is properly configured
            dob,
        };

        try {
            return await userRepository.updateUserDate(userData, user_id);
        }
        catch (error) {
            throw new Error(error)
        }
    }

    async updateUserSetting(data, lastId) {
        const filter = { user_id: lastId };
        const updateData = {
            user_id: lastId,
            user_interest: data.user_interest,
            age_from: data.age_from,
            age_to: data.age_to,
            profile_distance: data.profile_distance,
            budget: data.budget,
            user_notification: true,
            user_fingerprint: false,
            about_user: data.about_user,
            address: data.address
        };
        try {
            if (await userRepository.isUserSettingExists(lastId)) {
                return await userRepository.findAndUpdate(filter, updateData);
            }
            else {
                return await userRepository.insertSettingData(updateData);
            }
        } catch (error) {
            throw new Error(error);
        }
    }



    async updateProfileImage(url, userid) {

        try {
            return await userRepository.updateImage(url, userid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUserImage(data, userid) {
        const insertArry = [];
        data.forEach(element => {
            insertArry.push({
                user_id: userid,
                image: element.url,
                name: element.name
            })
        });
        try {
            return await userRepository.uploadImage(insertArry);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUserImage(photo, userid) {
        const insertArry = [];
        // data.forEach(element => {
        //     insertArry.push({
        //         user_id: userid,
        //         image: element.url,
        //         name: element.name
        //     })
        // });
        try {
            return await userRepository.deleteImage(photo, userid);
        } catch (error) {
            throw new Error(error);
        }
    }



    async getProfileMetaData(profileId) {

        try {
            return await userRepository.findUserMeta(profileId);
        }
        catch (error) {
            throw new Error(error)
        }
    }

    async createBlockProfile(data, user_id) {
        try {
            const insertData = {
                profile_id: data.profile_id,
                report_type: data.report_type,
                description: data.description,
                reportBy: user_id
            }
            return await userRepository.insertProfileBlockData(insertData);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllProfile(user_id) {
        try {
            return await userRepository.getProfileList(user_id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAllFriend(user_id) {
        try {
            return await friendRepository.getFriendList(user_id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async getPeopleAround(user_id, user_role) {
        try {
            return await friendRepository.getPeopleAroundList(user_id, user_role);
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteProfile(user_id) {
        try {
            return await userRepository.delProfile(user_id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async checkProfile(userId, data) {
        try {
            return await userRepository.checkIsProfile(userId, data);
        } catch (error) {
            throw new Error(error);
        }
    }

    async HideOrUnHideProfile(userId, data) {
        try {
            return await userRepository.updateIsProfile(userId, data);
        } catch (error) {
            throw new Error(error);
        }
    }



}

export default new userService();