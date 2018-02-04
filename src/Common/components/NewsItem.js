import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite/no-important';


import * as colors from '../constants/colors';
import './NewsItem.css';




class NewsItem extends Component{


    handleOPenNews(news){
        this.props.history.push({
            pathname: '/news',
            state: {
                news: news,
                filteredNews: this.props.filteredNews
            }
        });
    }

    render(){
        const {value} = this.props;
        return (
          <div className={css(styles.newsItem) + ` ${this.props.className}`} onClick={this.props.onClick}>
              <div className="animatedBlock">
                  <p>{value.name}</p>
                  <div className={"animatedTextBox"}>
                      <p>{value.description.slice(0, 50) + '...'}</p>
                      <p>
                          <a target={"_blank"} className={css(styles.link)} href={value.url}>View website</a>
                      </p>
                      <p>
                          <button onClick={() => this.handleOPenNews(value)}>Read more</button>
                      </p>
                  </div>
              </div>
          </div>
        );
    }
}



const styles = StyleSheet.create({
    newsItem: {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        height: 200,
        textAlign: 'center',
        padding: 5,
        cursor: 'pointer',
        overflow: 'hidden'
    },
    link: {
        color: colors.WHITE,
        ":hover": {
            color: colors.WHITE
        }
    }
});

export default withRouter(NewsItem);