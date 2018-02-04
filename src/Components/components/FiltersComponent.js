import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';


import Common from '../../Common/index'

const { components: { FilterList }, constants: { categories, languages, countries } } = Common;

class FiltersComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            category: 'select category',
            language: 'select language',
            countries: 'select countries'
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(target, type){

        if(target.value === categories.SELECT_CATEGORY || target.value === countries.SELECT_COUNTRY || target.value ===languages.SELECT_LANGUAGE){
            return;
        } else {
            this.setState({
                [type]: target.value
            });
            this.props.handleFilter(target.value, type);
        }
    }

    handleRemove(type, value){
        this.setState({
            [type]: `select ${type}`
        });
        this.props.handleRemove(type, value);
    }

    render(){
        const {handleSubmit, filters} = this.props;
        return (
            <aside className={css(styles.formWrapper)}>
                <h2 className={css(styles.title)}>News app</h2>
                <form onSubmit={handleSubmit} className={css(styles.formStyle)}>
                    <FilterList
                        name={'category'}
                        value={this.state.category}
                        id={"category"}
                        component={'select'}
                        onChange={(e) => this.handleFilter(e.target, 'category', e)}
                        list={categories.CATEGORIES_TYPE}
                    />
                    <div>
                        <ul>
                            {filters.category && filters.category.map((value, index) => <li key={index}>{value} <span className={css(styles.deleteButton)} onClick={() => this.handleRemove('category', value)}>x</span></li>)}
                        </ul>
                    </div>
                    <FilterList
                        name={'language'}
                        value={this.state.language}
                        component="select"
                        onChange={(e) => this.handleFilter(e.target, 'language')}
                        list={languages.LANGUAGES}
                    />
                    <div>
                        <ul>
                            {filters.language && filters.language.map((value, index) => <li key={index}>{value} <span className={css(styles.deleteButton)} onClick={() => this.handleRemove('language', value)}>x</span></li>)}
                        </ul>
                    </div>
                    <FilterList
                        value={this.state.countries}
                        name={'countries'}
                        component="select"
                        onChange={(e) => this.handleFilter(e.target, 'country')}
                        list={countries.COUNTRIES}
                    />
                    <div>
                        <ul>
                            {filters.country && filters.country.map((value, index) => <li key={index}>{value} <span className={css(styles.deleteButton)} onClick={() => this.handleRemove('country', value)}>x</span></li>)}
                        </ul>
                    </div>
                </form>
            </aside>
        );
    }

}

const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        boxShadow: '0 0 10px rgba(0, 0, 0, .4)'
    },
    formStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop:200,
    },
    title:{
        textAlign: 'center',
        textShadow: '0px 0px 1px black, 0 0 1px black'
    },
    deleteButton: {
        color: 'red',
       fontWeight: 'bold',
        cursor: 'pointer'

    }
});
//
// FiltersComponent = reduxForm({
//     form: formNames.FILTER_FORM
// })(FiltersComponent);

export default FiltersComponent;