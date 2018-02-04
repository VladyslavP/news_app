import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const ModalError = ({active}) => {
    return (
        <div className={css(styles.modalWrapper) + ` ${active ? css(styles.isActive) : null}`}>
            <p>Something went wrong</p>
        </div>
    );
};

const styles = StyleSheet.create({
    modalWrapper: {
        position: 'absolute',
        top: 20,
        right: -250,
        width: 200,
        height: 100,
        border: '1px solid lightgray',
        backgroundColor: 'white',
        color: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
        transition: 'all ease 1s'
    },
    isActive: {
        right: 40
    }
});

export default ModalError;