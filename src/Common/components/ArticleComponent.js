import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';


import {defaultImage} from '../images';
import ImageLoader from './ImageLoader';




class ArticleComponent extends Component{


    formatDate(date){
        const published = new Date(date);
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const day = published.getDate();
        const monthIndex = published.getMonth();
        const year = published.getFullYear();
        const hours = published.getHours();
        const minutes = published.getMinutes() <= 9 ? '0' + published.getMinutes() : published.getMinutes();


        return `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}`;
    }

    render(){
        const { articles } = this.props;
        return (
            <ul className={css(styles.wrapper)}>
                {articles.length && articles.map((article, index) => {
                    return (
                        <li key={`${article.urlToImage}${index}${article.publishedAt}`} className={css(styles.article)}>
                            <ImageLoader
                                src={article.urlToImage}
                                defaultImage={defaultImage}
                            />
                            <div className={css(styles.content)}>
                                <span className={css(styles.title)}>{article.title}</span>
                                <div className={css(styles.articleBottom)}>
                                    <span className={css(styles.author)}>{article.author}</span>
                                    <span className={css(styles.date)}>{this.formatDate(article.publishedAt)}</span>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }

}

const styles = StyleSheet.create({
    wrapper: {
        maxWidth: '90%',
        margin: '50px auto 5px auto',
        display:'flex',
        flexWrap: 'wrap',
        overflowY:'auto',
        position: 'absolute',
        bottom: 0,
        top: 0
    },
    article: {
        flex: 1,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        margin: 10,
        listStyle: 'none',
        display: 'flex',
        padding: 10,
        flexBasis: 350,
        justifyContent: 'space-between',
        overflow: 'hidden',
        height: 200

    },
    imageStyle: {
        width: 200
    },
    content: {
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'center',
        fontSize: 14
    },
    articleBottom: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});



export default ArticleComponent;