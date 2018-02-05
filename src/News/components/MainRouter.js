import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route } from 'react-router';
import { StyleSheet, css } from 'aphrodite/no-important';

import Common from '../../Common';
import actions from '../actions/index';
import MainPageComponent from './MainPageComponent';
import NewsPageComponent from './NewsPageComponent';
import * as selectors from '../selectors';

const {
    helpers: { saveDataToStorage, getDataFromStorage, removeDataFromStorage },
    components: {ModalError}
} = Common;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                category: [],
                language: [],
                country: []
            },
            filteredNews:[],
            paginationSize: null,
            page: 1
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        const data = getDataFromStorage('news');

        if (!data) {
            this.props.getNews()
                .then((data) => {
                    this.filterNews();
                    saveDataToStorage('news', data);
                    setTimeout(() => {
                        removeDataFromStorage('news');
                    }, 1200000);
                })
                .catch(() => {
                    this.props.toggleModal(true);
                });
        } else {
            const news = JSON.parse(data.news);
            const delta = Date.now() - data.timeStamp;
            const timeStamp = (delta >= 1200000) ? 0 : 1200000 - delta;


            this.props.getNewsFromLocalStorage(news)
                .then(() => {
                    this.filterNews();
                })
                .catch(() => {
                    this.props.toggleModal(true);
                });
            setTimeout(() => {
                removeDataFromStorage('news');
            }, timeStamp);
        }
    }

    handleChangePage(page) {
        this.setState({
            page
        });
    }


    filterNews = () => {
        const filters = this.state.filters;
        const news = this.props.news;
        const filterKeys = Object.keys(filters).filter((item => filters[item].length !== 0));
        const filtered =  news.filter((item) => {
            return filterKeys.every(key => {
                return !!(filters[key].indexOf(item[key]) + 1);
            });
        });

        let result = [];
        for(let i = 0; i < filtered.length; i += 1) {
            if (i % 6 === 0) {
                result.push(filtered.slice(i, i + 6));
            }
        }

        this.setState({
            paginationSize: result.length,
            filteredNews: result
        });
    };

    handleFilter(value, type) {
        const isAdded = this.state.filters[type].indexOf(value) + 1;

        if (!isAdded) {
            switch (type) {
                case 'category':
                    this.setState({
                        filters: {
                            ...this.state.filters,
                            category: [...this.state.filters.category, value]
                        },
                        page: 1
                    }, () => this.filterNews());
                    break;
                case 'language':
                    this.setState({
                        filters: {
                            ...this.state.filters,
                            language: [...this.state.filters.language, value]
                        },
                        page: 1
                    }, () => this.filterNews());
                    break;
                case 'country':
                    this.setState({
                        filters: {
                            ...this.state.filters,
                            country: [...this.state.filters.country, value]
                        },
                        page: 1
                    }, () => this.filterNews());
                    break;
                default: {
                    return;
                }
            }
        }
    }

    handleRemove(type, value) {
        switch (type) {
            case 'category':
                this.setState({
                    filters: {
                        ...this.state.filters,
                        category: [...this.state.filters.category.filter((item) => item !== value)]
                    },
                    page: 1
                }, () => this.filterNews());
                break;
            case 'language':
                this.setState({
                    filters: {
                        ...this.state.filters,
                        language: [...this.state.filters.language.filter((item) => item !== value)]
                    },
                    page: 1
                }, () => this.filterNews());
                break;
            case 'country':
                this.setState({
                    filters: {
                        ...this.state.filters,
                        country: [...this.state.filters.country.filter((item) => item !== value)]
                    },
                    page: 1
                }, () => this.filterNews());
                break;
            default: {
                return;
            }
        }
    }

    render() {
        const { filters, filteredNews, page } = this.state;
        const { modal } = this.props;
        return (
            <main className={css(styles.wrapper)}>
                <ModalError
                    active={modal}
                    toggleModal={this.props.toggleModal}
                />
                <Route exact path='/' render={() => <MainPageComponent
                    handleFilter={this.handleFilter}
                    handleRemove={this.handleRemove}
                    filters={filters}
                    filteredNews={filteredNews}
                    handleChangePage={this.handleChangePage}
                    page={page}
                />}/>
                <Route path='/news' render={() => <NewsPageComponent
                        getParticularNews={this.props.getParticularNews}
                        getArticlesFromLocalStorage={this.props.getArticlesFromLocalStorage}
                        getSortedArticles={this.props.getSortedArticles}
                        toggleModal={this.props.toggleModal}
                        filteredNews={filteredNews}
                        page={page}
                    />}
                />
            </main>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        overflow: 'hidden'
    }
});

const mapStateToProps = (state) => {
    return {
        news: selectors.news(state),
        modal: selectors.modal(state)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getSortedArticles: (id, type) => dispatch(actions.news.getSortedArticles(id, type)),
        getNews: () => dispatch(actions.news.getNews()),
        getNewsFromLocalStorage: (news) => dispatch(actions.news.getNewsFromLocalStorage(news)),
        getParticularNews: (news, id) => dispatch(actions.news.getParticularNews(news, id)),
        getArticlesFromLocalStorage: (articles, id) => dispatch(actions.news.getArticlesFromLocalStorage(articles, id)),
        toggleModal: (value) => dispatch(actions.modal.toggleModal(value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);