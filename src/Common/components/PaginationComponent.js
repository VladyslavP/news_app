import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';


import { colors } from '../../Common/constants';





class PaginationComponent extends Component{


    constructor(props) {
        super(props);
        this.state = {
            active: 1
        };

        this.makeActive = this.makeActive.bind(this);

    }

    componentWillReceiveProps(props){
        if(props.active !== this.state.active){
            this.setState({
                active: props.active
            });
        }
    }


    makeActive(index){
        this.setState({
            active: index
        });
        this.props.handleChangePage(index);

    }

    pageIndexesList(amount){
        let indexes = [];

        for (let i = 1; i <= amount; i += 1) {
            indexes.push(i);
        }

        return indexes;
    }

    show(pageIndex, amount){
        let showIndex = false;
        let showEllipsis = false;

        let active = this.state.active;
        let last = amount;

        if (pageIndex === 1 || pageIndex === active -1 || pageIndex === active || pageIndex === active + 1 || pageIndex === last) {
            showIndex = true;
        }

        if (1 <= active && (active <= last - 3)) {
            if (pageIndex === last - 1) {
                showEllipsis = true;
            }
        }
        if (4 <= active && active <= last) {
            if (pageIndex === 2) {
                showEllipsis = true;
            }
        }

        return {
            index: showIndex,
            ellipsis: showEllipsis
        };
    }



    render(){
        const { size, active } = this.props;
        return (
            <ul className={css(styles.pagination)}>
                {this.pageIndexesList(size).map((item, index) => {
                    return (
                        <li key={index} className={css(styles.paginationItem) + ` ${(index === 0 && css(styles.firstItem)) || null} ${(active === item && css(styles.active)) || null}`}>
                            <span onClick={() => this.makeActive(item)} className={(!this.show(index + 1, size).index && css(styles.hidden)) || css(styles.common)}>{item}</span>
                            <span className={(!this.show(index + 1, size).ellipsis && css(styles.hidden)) || css(styles.common)}>...</span>
                        </li>
                    )
                })}
            </ul>
        )
    }


}

const styles = StyleSheet.create({
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
        cursor: 'pointer'
    },
    paginationItem: {
        listStyle: 'none'
    },
    hidden: {
        display:'none'
    },
    common: {
        display: 'block',
        padding: 10,
        borderRight: '1px solid black',
        borderBottom:'1px solid black',
        borderTop:'1px solid black'
    },
    active: {
        backgroundColor: colors.BLUE,
        color: colors.WHITE
    },
    firstItem: {
        borderLeft: '1px solid black'
    }
});

export default PaginationComponent;