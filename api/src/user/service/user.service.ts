import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
const jwt = require("jsonwebtoken");
import { ConfigService  } from '@nestjs/config';

const bcrypt = require("bcrypt");


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService
    ) {}

    async createUser(req): Promise<{message: string, result?: any}> {
      console.log('createUser', req.body)

        return bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new this.userModel({
              email: req.body.email,
              password: hash,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              patronymic: req.body.patronymic,
              roles: req.body.roles,
              // ouqRole: req.body.ouqRole,
            });
            return user
              .save()
              .then(result => {
                return {
                  message: "User created!",
                  result: result
                };
              })
              .catch(err => {
                return {
                  message: "Invalid authentication credentials!"
                };
              });
          });
    }
    async testtest(){
      return this.userModel.find();
    }
    async userLogin(req): Promise<any> {
        let fetchedUser;
        return this.userModel.findOne({ email: req.body.email })
          .then(user => {
            if (!user) {
              return {
                status: 401,
                message: "Auth failed"
              };
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
          })
          .then(result => {

            if (!result) {
              return {
                status: 401,
                message: "Auth failed"
              };
            }
            const token = jwt.sign(
              { email: fetchedUser.email, userId: fetchedUser._id },
              this.configService.get<string>('JWT_KEY'),
            //   process.env.JWT_KEYб
              { expiresIn: "1d" }
            );
            return {
              status: 200,
              token: token,
              expiresIn: 86400,
              userId: fetchedUser._id,
              user: fetchedUser
            };
          })
          .catch(err => {
            return {
              status: 401,
              message: "Invalid authentication credentials!"
            };
          });
    }
    async userAutoLogin(req): Promise<any> {
        try {
            const decodedToken = jwt.verify(req.body.token, this.configService.get<string>('JWT_KEY'));
            return this.userModel.findOne({ email: decodedToken.email })
                .then(user => {
                    if (!user) {
                        return {
                            status: 401,
                            message: "Auth failed"
                        };
                    }
                    const token = jwt.sign(
                        { email: user.email, userId: user._id },
                        this.configService.get<string>('JWT_KEY'),
                        { expiresIn: "1d" }
                      );
                    return {
                        status: 200,
                        token: token,
                        expiresIn: 86400,
                        userId: user._id,
                        user: user
                    };
                })
                .catch(err => {
                    return {
                    status: 401,
                    message: "Invalid authentication credentials!"
                    };
                });
        } catch (error) {
            return  {
                        status: 401, 
                        message: "You are not authenticated!",
                    }
        }


    }
    async userRecoverPassword(req): Promise<any> {
      try {
          return this.userModel.findOne({ email: req.body.email })
              .then(user => {
                  if (!user) {
                      return {
                          status: 401,
                          message: "Auth failed"
                      };
                  }
                  const token = jwt.sign(
                      { email: user.email, userId: user._id },
                      this.configService.get<string>('JWT_KEY_REC_PASS'),
                      { expiresIn: "1d" }
                    );
                  return {
                      status: 200,
                      token: token,
                      expiresIn: 86400,
                  };
              })
              .catch(err => {
                  return {
                  status: 401,
                  message: "Invalid authentication credentials!"
                  };
              });
      } catch (error) {
          return  {
                      status: 401, 
                      message: "You are not authenticated!",
                  }
      }


    }
    async userRecoverPasswordNext(req): Promise<any> {
      try {
          const decodedToken = jwt.verify(req.body.token, this.configService.get<string>('JWT_KEY_REC_PASS'));
          return bcrypt.hash(req.body.password, 10)
              .then(hash=>{
                return this.userModel.updateOne({ _id: decodedToken.userId }, {$set: {password: hash}})
                .then(result => {
                  return {
                    message: "Password Updated!",
                    result: result,
                    email: decodedToken.email
                  };
                })
                .catch(err => {
                    return {
                      status: 401,
                      message: "Invalid authentication credentials!"
                    };
                });
              })
      } catch (error) {
          return  {
                      status: 401, 
                      message: "You are not authenticated!",
                  }
      }
  }
}
