module.exports = 
	attributes:
		Id: 
			type: "integer"
			autoIncrement: yes
			primaryKey: yes
		Name: 
			type: "string"
			required: yes
		Age: 
			type: "integer"
			required: yes
		User: 
			type: "string"
		Password: 
			type: "string"

	autoCreatedAt: off
	autoUpdatedAt: off
	autoPK: off
