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
        <div>

            <div className={classnames("Board")}>
                <div>{t('board__game-link-prefix')}: <a href={document.location.toString()}>{document.location.toString()}</a></div>
                {fieldIndexes.map(fieldIndex => <Field index={fieldIndex} key={fieldIndex} />)}
                {[Color.RED, Color.BLUE, Color.GREEN, Color.BLACK].map(color => <House color={color} key={color} />)}
            </div>
            <Footer />
        </div>
    );
}

export default Board;
