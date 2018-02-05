import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import Common from '../../Common';

const {  components: { NewsItem, PaginationComponent } } = Common;

class NewsComponent extends Component {
    // eslint-disable-next-line
    handleChangePage = (i) => {
        this.props.handleChangePage(i);
    };

    render() {
        const { page, filteredNews} = this.props;
        return (
            <section className={css(styles.flex)}>
                <div className={css(styles.wrapper)}>
                    <div className={css(styles.wrapperRow)}>
                        {(filteredNews.length && filteredNews[page - 1].map((value, index) => {
                            return (
                                <NewsItem isButton={true} filteredNews={filteredNews} className={css(styles.news)} value={value} key={index}/>
                            );
                        })) || null}
                    </div>
                    <PaginationComponent
                        handleChangePage={this.handleChangePage}
                        size={filteredNews.length}
                        active={page}
                    />
                </div>
            </section>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    wrapperRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        margin: '0 auto',
        justifyContent: 'center',
        marginTop: 20
    },
    section: {
        display: 'flex',
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flex:{
        display: 'flex',
        flex: 4
    },
    news: {
        flexBasis: '30%',
        margin: 10,
        minWidth: 200
    }
});


export default NewsComponent;