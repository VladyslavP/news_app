import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';



class FilterList extends Component{

    render(){
        const {list = [], elementStyle} = this.props;
        return (
            list.map((item, index) => <option value={item} key={index} className={`${elementStyle} ${css(styles.item)}`}>{item}</option>)
        );
    }

}

const styles = StyleSheet.create({
   wrapper: {
       margin: 0,
       padding: 0
   },
   item: {
       listStyle: 'none'
   }
});


export default FilterList;