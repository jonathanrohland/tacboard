import React from 'react';
import classnames from 'classnames';


import Field from './Field';
import './Board.css';
import { FieldIndex, Color } from '../types';
import House from './House';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';



function Board() {
    const { t } = useTranslation();
    const fieldIndexes = Array.from(Array(80).keys()) as Array<FieldIndex>;

    return (
        <div className="Board__container">
            <div className="Board__game-link">{t('board__game-link-prefix')}: <a href={document.location.toString()}>{document.location.toString()}</a></div>
            <div className={classnames("Board")}>
                {[Color.RED, Color.BLUE, Color.GREEN, Color.BLACK].map(color => <House color={color} key={color} />)}
                {fieldIndexes.map(fieldIndex => <Field index={fieldIndex} key={fieldIndex} />)}
            </div>
            <Footer />
        </div>
    );
}

export default Board;
