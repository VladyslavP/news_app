import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';


import Common from '../../Common';
import { articles } from "../selectors";

const { components: {NewsItem, ArticleComponent}, helpers: {removeArticleFromStorage, saveArticlesToStorage, getDataFromStorage}} = Common;




class NewsPageComponent extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            top: false,
            publishedAt: false,
            popular: false,
            filterType: 'latest',
            id: null,
            view: []
        };

        this.filterBy = this.filterBy.bind(this);
        this.getParticularNews = this.getParticularNews.bind(this);
        this.filterArticleById = this.filterArticleById.bind(this);

    }

    componentDidMount() {
        const data = getDataFromStorage('articles');
        const news = this.props.location.state.news;


        if (!data) {
            this.props.getParticularNews(news, news.id)
                .then((data) => {
                    saveArticlesToStorage(data, news.id, 'latest');
                    setTimeout(() => {
                        removeArticleFromStorage(this.state.id);
                    }, 1200000);

                })
                .catch(() => {
                    this.props.toggleModal(true);
                });
        } else {
            const element = data[news.id];
            if(!element){

                this.props.getParticularNews(news, news.id)
                    .then((d) => {
                        saveArticlesToStorage(d, news.id, 'latest');
                        setTimeout(() => {
                            removeArticleFromStorage(this.state.id);
                        }, 1200000);

                    })
                    .catch(() => {
                        this.props.toggleModal(true);
                    });
            } else {

                const delta = new Date().getTime() - element.timeStamp;
                const timeStamp = (delta >= 1200000) ? 0 : 1200000 - delta;
                const isInStore = Object.keys(this.props.articles).length && this.props.articles[news.id] && this.props.articles[news.id]['latest'].length;
                const elementToView = data[news.id].data['latest'];
                this.setState({
                    view: elementToView
                });

                if(!isInStore){
                    this.props.getArticlesFromLocalStorage(data[news.id].data.latest, news.id)
                        .then(() => {

                        })
                        .catch(() => {
                            this.props.toggleModal(true);
                        });
                }
                setTimeout(() => {
                    removeArticleFromStorage(this.state.id);
                }, timeStamp);
            }


        }

        this.setState({
            id: news.id
        });
    }

    componentWillReceiveProps(props){
        if(Object.keys(props.articles).length){
            const news = props.location.state.news;
            this.filterArticleById(props.articles, news.id, 'latest');
        }
    }

    filterArticleById(articles, id, type){
        const filterType = type;
        const isExist = articles[id];
        if(Object.keys(articles).length === 0 || !isExist){
            return [];
        } else {
            this.setState({
                view: articles[id][filterType]
            });
        }
    }
    getParticularNews(item){
        const data = getDataFromStorage('articles');
        const element = data[item.id];
        const elementInStore = this.props.articles[item.id];

        if(!element && !elementInStore){

            this.props.getParticularNews(item, item.id)
                .then((data) => {
                    saveArticlesToStorage(data, item.id, 'latest');
                    this.filterArticleById(this.props.articles, item.id, 'latest');
                })
                .catch(() => {
                    this.props.toggleModal(true);
                });
        } else if(element && !elementInStore){
            this.props.getArticlesFromLocalStorage(element.data[this.state.filterType], item.id)
                .then(() => {
                    this.filterArticleById(this.props.articles, item.id, 'latest');
                })
                .catch(() => {
                    this.props.toggleModal(true);
                });
        } else {
            this.filterArticleById(this.props.articles, item.id, 'latest');
        }

        this.setState({
            id: item.id,
            filterType: 'latest'
        });
    }


    filterBy(type){
        const data = getDataFromStorage('articles');
        const element = data[this.state.id] && data[this.state.id].data[type];

        if(type === 'latest') {
            this.filterArticleById(this.props.articles, this.state.id, 'latest');
        }

        if(type === 'top'){
            if(element){
                this.setState({
                    view: element,
                    filterType: type
                });
            } else {
                this.props.getSortedArticles(this.state.id, 'top')
                    .then((data) => {
                        saveArticlesToStorage(data, this.state.id, 'top');
                        this.filterArticleById(this.props.articles, this.state.id, 'top');
                        this.setState({
                            filterType: type
                        });
                    })
                    .catch(() => {
                        this.props.toggleModal(true);
                    });
            }
        }
        if(type === 'popularity'){
            if(element){
                this.setState({
                    view: element,
                    filterType: type
                });
            } else {
                this.props.getSortedArticles(this.state.id, 'popularity')
                    .then((data) => {
                        saveArticlesToStorage(data, this.state.id, 'popularity');
                        this.filterArticleById(this.props.articles, this.state.id, 'popularity');
                        this.setState({
                            filterType: type
                        });
                    })
                    .catch(() => {
                        this.props.toggleModal(true);
                    });
            }
        } else {
            this.setState({
                filterType: type
            });
            return articles;
        }
    }


    joinNews(){
        return this.props.location.state.filteredNews.reduce((result, item) => {
            return result.concat(item);
        }, []);
    }

    isActive(type){
        return type === this.state.filterType;
    }



    render(){
        const { filteredNews=[] } = this.props;
        const { top, publishedAt,  popular, view } = this.state;

        return (
            <div className={css(styles.newsWrapper)}>
                <div className={css(styles.news)}>
                    {filteredNews.length && this.joinNews().map((item, index) =>
                        <NewsItem
                            className={css(styles.newsItem) + ` ${item.id === this.state.id ? css(styles.activeSection) : null}`}
                            onClick={() => this.getParticularNews(item)}
                            key={index}
                            isStatic={item.id === this.state.id}
                            isButton={false}
                            value={item}/>
                    )}
                </div>
                <div style={{flex: 4}}>
                    <div className={css(styles.sortBlock)}>
                        <p className={css(styles.buttonsWrapper)}>
                            <button
                                className={css(styles.buttonFilter) + ` ${this.isActive('latest') ? css(styles.active) : null}`}
                                disabled={publishedAt}
                                onClick={() => this.filterBy('latest')}
                            >
                                Latest
                            </button>
                            <button
                                className={css(styles.buttonFilter) + ` ${this.isActive('top') ? css(styles.active) : null}`}
                                disabled={top}
                                onClick={() => this.filterBy('top')}
                            >
                                Top
                            </button>
                            <button
                                className={css(styles.buttonFilter) + ` ${this.isActive('popularity') ? css(styles.active) : null}`}
                                disabled={popular}
                                onClick={() => this.filterBy('popularity')}
                            >
                                Popular
                            </button>
                        </p>
                    </div>
                    {(view && view.length &&
                        <ArticleComponent
                            articles={view}
                        /> )|| <p className={css(styles.noarticles)}>There are no articles...</p>
                    }
                </div>
            </div>
        );
    }

}

const styles = StyleSheet.create({
    newsWrapper: {
        paddingLeft: 20,
        flex: 1,
        display: 'flex'
    },
    news: {
        overflowY: 'auto',
        paddingLeft: 5,
        paddingRight: 5,
        height: '100vh',
        flex: 1,
        margin: '5px auto'
    },
    newsItem: {
        margin: '10px 0'
    },
    sortBlock: {
        width: '90%',
        margin: '0 auto 10px auto',
        textAlign: 'center'
    },
    buttonFilter: {
        width: 100,
        padding:'7px 10px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        ":active": {
            outline: 'none'
        },
        ":focus": {
            outline: 'none'
        }
    },
    disabled: {
        cursor: 'no-drop'
    },
    buttonsWrapper: {

    },
    active: {
        boxShadow: '0 0 10px rgba(0, 0, 0, .4)'
    },
    activeSection: {
        fontSize: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white'
    },
    noarticles: {
        textAlign: 'center'
    }

});


const mapStateToProps = (state, props) => {
    return {
        articles: articles(state)
    };
};

export default withRouter(connect(mapStateToProps)(NewsPageComponent));