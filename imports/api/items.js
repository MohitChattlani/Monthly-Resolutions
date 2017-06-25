import {Mongo} from 'meteor/mongo';

export const Items=new Mongo.Collection('resolutions'); //exporting a const variable Items
                                                  //made equal to the Collection method of Mongo object 