import React, { Component } from 'react';
import {StyleSheet, css} from "aphrodite/no-important";



const Preloader = () => {
    return (
        <span className={css(styles.rainbow) + ' ' + css(styles.default)}></span>
    );
};



const styles = StyleSheet.create({

    default: {
        display: 'inline-block',
        width: 25,
        height: 25,
        borderRadius: '50%'
    },
    rainbow: {
        animationName: {
            '0%' : {
                backgroundColor: '#75EB00'
            },
            '20%' : {
                backgroundColor: '#53BBF4'
            },
            '40%' : {
                backgroundColor: '#FF85CB'
            },
            '60%' : {
                backgroundColor: '#FF432E'
            },
            '80%' : {
                backgroundColor: '#FFAC00'
            },
            '1000%' : {
                backgroundColor: '#982395'
            }
        },
        animationDuration: '1s',
        animationTimingFunction: 'ease',
        animationIterationCount: 'infinite'
    }

});

export default Preloader