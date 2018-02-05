import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite/no-important';

import * as colors from '../constants/colors';
import './NewsItem.css';

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
        ':hover': {
            color: colors.WHITE
        }
    },
    button: {
        cursor: 'pointer',
        border: `1px solid ${colors.WHITE}`,
        padding: '7px 10px',
        background: 'transparent',
        transition: 'all ease .4s',
        color: colors.WHITE,
        ':hover': {
            boxShadow: '0 0 10px rgba(0, 0, 0, .4)',
            background: colors.WHITE,
            color: 'black'
        }
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

class NewsItem extends Component {
    handleOPenNews(news) {
        this.props.history.push({
            pathname: '/news',
            state: {
                filteredNews: this.props.filteredNews,
                news
            }
        });
    }

    render() {
        const {value, isStatic, isButton} = this.props;

        return (
          <div className={css(styles.newsItem) +
                        ` ${this.props.className}`}
                        onClick={this.props.onClick}
            >
              <div className={!isStatic ? 'animatedBlock' : null}>
                  <p className={css(styles.title)}>{value.name}</p>
                  <div className={!isStatic ? 'animatedTextBox' : null}>
                      <p>{value.description.slice(0, 50) + '...'}</p>
                      <p>
                          <a target={'_blank'}
                             className={css(styles.link)}
                             href={value.url}>
                              View website
                          </a>
                      </p>
                      {(isButton &&
                          <p>
                              <button
                                  className={css(styles.button)}
                                  onClick={() => this.handleOPenNews(value)}>
                                    Read more
                              </button>
                          </p>) || null
                      }
                  </div>
              </div>
          </div>
        );
    }
}

export default withRouter(NewsItem);
