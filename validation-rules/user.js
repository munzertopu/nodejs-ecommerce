module.exports = {
	create:{
		name: {type: 'string', required: true, max: 8},
		password: {type: 'string', required: true, min: 6},
		gender: {type: 'string', required: true}
	},
	update:{
		
	}
};