import React, { Component } from 'react';

import NewsComponent from './NewsComponent';
import FiltersComponent from './FiltersComponent';

class MainPageComponent extends Component {
    render() {
        const {
            filters,
            handleFilter,
            handleRemove,
            filteredNews,
            handleChangePage,
            page
        } = this.props;
        return [
            <FiltersComponent
                handleFilter={handleFilter}
                handleRemove={handleRemove}
                filters={filters}
                key={'filters_component'}
            />,
            <NewsComponent
                filteredNews={filteredNews}
                handleChangePage={handleChangePage}
                page={page}
                key={'news_component'}
            />
        ];
    }
}

export default MainPageComponent;
