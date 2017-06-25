import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

import './main.html';
import {Items} from '../imports/api/items.js'; //need to declare items before using them

Template.body.onCreated(function bodyOnCreated(){		
	this.state=new ReactiveDict();   //setting up a new reactive-dict
});



Template.body.helpers({
	resolutions:function(event){
		const instance=Template.instance(); //think of instance as a reference to class like an object
		if (instance.state.get('hideCompleted')) {
			return Items.find({checked:{$ne:true}}); //$ne is a construct of Mongodb which refers to not equal
		}
		else
		{
			return Items.find({});
		}
	}
});
Template.body.events({
	'submit .new-resolution':function(event){
		var title=event.target.title.value;
		console.log(title);
		var pattern=/^[A-Za-z\s]+$/;
		if (title.match(pattern))
		{
			Items.insert({title:title,checked:false,createdAt:new Date()});
		}
		event.target.title.value="";
		return false;	
	},
	'change .hide-completed input':function(event,instance){
		instance.state.set('hideCompleted',event.target.checked); //name of variable is 'hideCompleted' and value is event.target.checked
	}
});

Template.info.events({

	'click .rem':function(){
		Items.remove({"_id":this._id});
	},
	'click .check':function(){
		Items.update({"_id":this._id},{
			$set:{checked:!this.checked}
		}
		);
	}
});