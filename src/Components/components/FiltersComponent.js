import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';


import Common from '../../Common/index'

const { components: { FilterList }, constants: { categories, formNames, languages, countries } } = Common;





class FiltersComponent extends Component{


    handleFilter(target, type){

        if(target.value === categories.SELECT_CATEGORY || target.value === countries.SELECT_COUNTRY || target.value ===languages.SELECT_LANGUAGE){
            return;
        } else {
            this.props.handleFilter(target.value, type);
        }
    }

    handleRemove(type, value){
        this.props.handleRemove(type, value);
    }

    render(){
        const {handleSubmit, filters} = this.props;
        return (
            <aside className={css(styles.formWrapper)}>
                <form onSubmit={handleSubmit} className={css(styles.formStyle)}>
                    <Field
                        name={'category'}
                        value={"business"}
                        id={"category"}
                        ref={(category) => this.category = category}
                        component={'select'}
                        onChange={(e) => this.handleFilter(e.target, 'category', e)}
                    >
                        <FilterList
                            list={categories.CATEGORIES_TYPE}
                        />
                    </Field>
                    <div>
                        <ul>
                            {filters.category && filters.category.map((value, index) => <li key={index}>{value} <span onClick={() => this.handleRemove('category', value)}>Delete</span></li>)}
                        </ul>
                    </div>
                    <Field
                        name={'language'}
                        component="select"
                        onChange={(e) => this.handleFilter(e.target, 'language')}
                    >
                        <FilterList
                            list={languages.LANGUAGES}
                        />
                    </Field>
                    <div>
                        <ul>
                            {filters.language && filters.language.map((value, index) => <li key={index}>{value} <span onClick={() => this.handleRemove('language', value)}>Delete</span></li>)}
                        </ul>
                    </div>
                    <Field
                        name={'countries'}
                        component="select"
                        onChange={(e) => this.handleFilter(e.target, 'country')}
                    >
                        <FilterList
                            list={countries.COUNTRIES}
                        />
                    </Field>
                    <div>
                        <ul>
                            {filters.country && filters.country.map((value, index) => <li key={index}>{value} <span onClick={() => this.handleRemove('country', value)}>Delete</span></li>)}
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
        paddingLeft: 20
    },
    formStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop:200
    }
});

FiltersComponent = reduxForm({
    form: formNames.FILTER_FORM
})(FiltersComponent);

export default FiltersComponent;