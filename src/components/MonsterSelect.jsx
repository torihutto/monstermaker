import React from 'react';

class MonsterSelect extends React.Component {
	constructor(){
		super(...arguments);

		this.handleChange=this.handleChange.bind(this);
	}
	static get defaultProps(){
		return {
			label:"",
			name:"",
			value:"",
			onChange: function(){},
			monsterOptions:[]
		};
	}
	handleChange(e){
		this.props.onChange(e);
	}
	render(){
		var selectOptions=[];
		for(var i=0; i < this.props.monsterOptions.length; i++){
			var opt= this.props.monsterOptions[i];
			selectOptions.push(<option key={i} value={opt.index}>{opt.title}</option>);
		}

		return <label>{this.props.label}
			<select onChange={this.handleChange} name={this.props.name}>
				{selectOptions}
			</select>
		</label>

	}
};
export default MonsterSelect;