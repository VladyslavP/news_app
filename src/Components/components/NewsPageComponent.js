import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';


import Common from '../../Common';
import { articles, particularNews } from "../selectors";

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

                });
        } else {
            const element = data[news.id];
            if(!element){

                this.props.getParticularNews(news, news.id)
                    .then((d) => {
                        saveArticlesToStorage(d, news.id, 'latest');
                        setTimeout(() => {
                            removeArticleFromStorage(news.id);
                        }, 1200000);

                    });
            } else {

                const delta = new Date().getTime() - element.timeStamp;
                const timeStamp = (delta >= 1200000) ? 0 : 1200000 - delta;
                const isInStore = Object.keys(this.props.articles).length && this.props.articles[news.id]['latest'].length;
                const elementToView = data[news.id].data['latest'];
                this.setState({
                    view: elementToView
                });
                if(!isInStore){
                    this.props.getArticlesFromLocalStorage(data[news.id].data.latest, news.id)
                        .then(() => {
                            console.log(data);
                        });
                }
                setTimeout(() => {
                    removeArticleFromStorage(news.id);
                }, timeStamp);
            }


        }

        this.setState({
            id: news.id
        });
    }

    removeFromStorage(){

    }

    componentWillReceiveProps(props){
        if(Object.keys(props.articles).length){
            const news = props.location.state.news;
            console.log(props);
            console.log(news);
            this.filterArticleById(props.articles, news.id, 'latest');



            //
            // if(!!isTop){
            //     this.setState({
            //         top: false
            //     });
            // } else if(!!isLatest){
            //     this.setState({
            //         publishedAt: false
            //     });
            // } else if(!!isPopular){
            //     this.setState({
            //         popular: false
            //     });
            // }
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

        // console.log(articles);
        // const filteredArticlesById = articles[id][this.state.filterBy].filter((item) => item.source.id === id);
        // return filteredArticlesById;

    }

    filterArticlesByType(articles){

        const filterBy = this.state.filterBy;

        if(filterBy === 'latest') {
            return articles;
        }
        if(filterBy === 'popularity'){
            this.props.getSortedArticlesBy(this.state.id, filterBy);
        }else {
            return articles;
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
                });
        } else if(element && !elementInStore){
            this.props.getArticlesFromLocalStorage(element.data[this.state.filterType], item.id)
                .then(() => {
                    this.filterArticleById(this.props.articles, item.id, 'latest');
                });
        } else {

            this.filterArticleById(this.props.articles, item.id, 'latest');
        }
        this.setState({
            id: item.id
        });



    }


    filterBy(type){
        const data = getDataFromStorage('articles');
        console.log(data);
        const element = data[this.state.id].data[type];
        console.log(element);

        if(type === 'latest') {
            if(element){

            }
            this.filterArticleById(this.props.articles, this.state.id, 'latest');
        }

        if(type === 'top'){
            if(element){
                this.setState({
                    view: element
                });
            } else {
                this.props.getSortedArticles(this.state.id, 'top')
                    .then((data) => {
                        saveArticlesToStorage(data, this.state.id, 'top');
                        this.filterArticleById(this.props.articles, this.state.id, 'top');
                    });
            }
        }
        if(type === 'popularity'){
            if(element){
                this.setState({
                    view: element
                });
            } else {
                this.props.getSortedArticles(this.state.id, 'popularity')
                    .then((data) => {
                        saveArticlesToStorage(data, this.state.id, 'popularity');
                        this.filterArticleById(this.props.articles, this.state.id, 'popularity');
                    });
            }
        } else {
            return articles;
        }
    }


    joinNews(){
        return this.props.location.state.filteredNews.reduce((result, item) => {
            return result.concat(item);
        }, []);
    }



    render(){
        const { filteredNews=[]} = this.props;
        const { top, publishedAt,  popular, view } = this.state;

        return (
            <div className={css(styles.newsWrapper)}>
                <div className={css(styles.news)}>
                    {filteredNews.length && this.joinNews().map((item, index) => <NewsItem className={css(styles.newsItem) + ` ${item.id === this.state.id ? css(styles.active) : null}`} onClick={() => this.getParticularNews(item)} key={index} value={item}/>)}
                </div>
                <div style={{flex: 4}}>
                    <div className={css(styles.sortBlock)}>
                        <p className={css(styles.buttonsWrapper)}>
                            <button className={css(styles.buttonFilter) + ` ${publishedAt ? css(styles.disabled) : null}`} disabled={publishedAt} onClick={() => this.filterBy('latest')}>Latest</button>
                            <button className={css(styles.buttonFilter) + ` ${top ? css(styles.disabled) : null}`} disabled={top} onClick={() => this.filterBy('top')}>Top</button>
                            <button className={css(styles.buttonFilter) + ` ${popular ? css(styles.disabled) : null}`} disabled={popular} onClick={() => this.filterBy('popularity')}>Popular</button>
                        </p>
                    </div>

                    {/*<h1>{this.filterArticleById(articles, id).length}</h1>*/}
                    {view.length &&
                    <ArticleComponent
                        articles={view}
                    /> || null
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
    },

});


const mapStateToProps = (state, props) => {
    return {
        articles: articles(state)
    };
};

export default withRouter(connect(mapStateToProps)(NewsPageComponent));