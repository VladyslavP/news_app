import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
    loaderWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 200,
        maxWidth: 200,
        overflow: 'hidden'
    },
    photo: {
        width: '100%'
    }
});

class ImageLoader extends Component {
    render() {
        const { src, defaultImage } = this.props;
        return (

            <div className={css(styles.loaderWrapper)}>
                <img className={css(styles.photo)} src={src || defaultImage} alt=''/>
            </div>

        );
    }
}

export default ImageLoader;

