import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

class ModalError extends Component{
    componentWillReceiveProps(props){
        if(props.active){
            this.timer = setTimeout(() => {
                this.props.toggleModal(false);
            }, 2000);
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    render(){
        const { active } = this.props;
        return (
            <div className={css(styles.modalWrapper) + ` ${active ? css(styles.isActive) : null}`}>
                <p>Something went wrong</p>
            </div>
        )
    }
}

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
        transition: 'all ease .3s'
    },
    isActive: {
        right: 40
    }
});

export default ModalError;