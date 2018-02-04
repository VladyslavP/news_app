import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';


import Common from '../../Common';
import { articles, particularNews } from "../selectors";

const { components: {NewsItem, ArticleComponent}, helpers: {removeArticleFromStorage, saveArticlesToStorage, getDataFromStorage, removeDataFromStorage}} = Common;




class NewsPageComponent extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            top: true,
            publishedAt: true,
            popular: true,
            filterBy: null,
            id: null
        };

        this.filterBy = this.filterBy.bind(this);
        this.getParticularNews = this.getParticularNews.bind(this);
        this.setToStateArticlesById = this.setToStateArticlesById.bind(this);

    }

    componentDidMount() {
        const data = getDataFromStorage('articles');
        const news = this.props.location.state.news;




        if (!data) {

            this.props.getParticularNews(news)
                .then((data) => {
                    saveArticlesToStorage(data, news.id);
                    setTimeout(() => {
                        removeDataFromStorage('articles');
                    }, 1200000);
                });
        } else {
            const element = data[news.id];


            if(!element){

                this.props.getParticularNews(news)
                    .then((d) => {
                        saveArticlesToStorage(d, news.id);
                        setTimeout(() => {
                            removeArticleFromStorage(news);
                        }, 1200000);
                    });
            } else {

                const delta = new Date().getTime() - element.timeStamp;
                const timeStamp = (delta >= 1200000) ? 0 : 1200000 - delta;
                const isInStore = this.setToStateArticlesById(this.props.articles, news.id).length;
                if(!isInStore){
                    this.props.getArticlesFromLocalStorage(data[news.id].data);
                }
                setTimeout(() => {
                    removeDataFromStorage('articles');
                }, timeStamp);
            }


        }
        this.setState({
            id: news.id
        });
    }

    componentWillReceiveProps(props){
        if(props.articles.length){
            const isTop = props.articles[0].top;
            const isLatest = props.articles[0]['publishedAt'];
            const isPopular = props.articles[0]['popular'];


            if(!!isTop){
                this.setState({
                    top: false
                });
            } else if(!!isLatest){
                this.setState({
                    publishedAt: false
                });
            } else if(!!isPopular){
                this.setState({
                    popular: false
                });
            }
            this.setToStateArticlesById(props.articles);
        }
    }

    setToStateArticlesById(articles, id){
        const filteredArticlesById = articles.filter((item) => item.source.id === id);
        return filteredArticlesById;

    }

    filterArticles(articles){

        const filterBy = this.state.filterBy;

        if(filterBy === 'publishedAt'){
            return articles.sort((a, b) => {
                let first = new Date(a.publishedAt);
                let second = new Date(b.publishedAt);
                if (first > second) {
                    return -1;
                } else if (first < second) {
                    return 1;
                } else {
                    return 0;
                }

            });
        } else {
            return articles;
        }


    }



    getParticularNews(item){
        const data = getDataFromStorage('articles');
        const element = data[item.id];
        const elem = this.setToStateArticlesById(this.props.articles, item.id);

        if(!element && elem.length === 0){
            this.props.getParticularNews(item)
                .then((data) => {
                    saveArticlesToStorage(data, item.id);
                });
        } else if(element && elem.length === 0){

            this.props.getArticlesFromLocalStorage(element.data);
        }
        this.setState({
            id: item.id
        });



    }


    filterBy(type){
        this.setState({
            filterBy: type
        });
    }


    joinNews(){
        return this.props.location.state.filteredNews.reduce((result, item) => {
            return result.concat(item);
        }, []);
    }



    render(){
        const { filteredNews=[], page, articles=[]} = this.props;
        const { top, publishedAt,  popular, id } = this.state;

        return (
            <div className={css(styles.newsWrapper)}>
                <div className={css(styles.news)}>
                    {filteredNews.length && this.joinNews().map((item, index) => <NewsItem className={css(styles.newsItem) + ` ${item.id === this.state.id ? css(styles.active) : null}`} onClick={() => this.getParticularNews(item)} key={index} value={item}/>)}
                </div>
                <div style={{flex: 4}}>
                    {articles.length &&
                        <div className={css(styles.sortBlock)}>
                            <p className={css(styles.buttonsWrapper)}>
                                <button className={css(styles.buttonFilter) + ` ${publishedAt ? css(styles.disabled) : null}`} disabled={publishedAt} onClick={() => this.filterBy('publishedAt')}>Latest</button>
                                <button className={css(styles.buttonFilter) + ` ${top ? css(styles.disabled) : null}`} disabled={top} onClick={() => this.filterBy('top')}>Top</button>
                                <button className={css(styles.buttonFilter) + ` ${popular ? css(styles.disabled) : null}`} disabled={popular} onClick={() => this.filterBy('popular')}>Popular</button>
                            </p>
                        </div> || null
                    }
                    <h1>{this.setToStateArticlesById(articles, id).length}</h1>
                    <ArticleComponent
                        articles={this.filterArticles(this.setToStateArticlesById(articles, id))}
                    />
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
        border: '1px solid black',
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
        backgroundColor: 'red'
    }
});


const mapStateToProps = (state, props) => {
    return {
        articles: articles(state)
    };
};

export default withRouter(connect(mapStateToProps)(NewsPageComponent));