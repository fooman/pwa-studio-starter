import React, {useEffect, useState} from "react";
import axios from 'axios';

import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './changeLog.css';
import {shape, string} from "prop-types";
import Button from "@magento/venia-ui/lib/components/Button";

const ChangeLog = props => {
    const { changeLogUrl } = props;
    const [ itemData, setItemData ] = useState([]);
    const [ viewAllData, allowViewAllData] = useState(false);
    const displayLimit = 5;
    const classes = mergeClasses(defaultClasses);

    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

    useEffect(() => {
        axios({
            method: 'get',
            url: PROXY_URL+changeLogUrl,
        })
            .then(response => {
                if (response.status === 200) {
                    const {data} = response;
                    const { items } = data;
                    if (data && items.length) {
                        let item = items.reverse();
                        setItemData(item);
                    }
                }
            })
            .catch(err => console.log(err));
    }, [changeLogUrl]);

    const viewAllReleasesHandle = () => {
        allowViewAllData(true);
    }

    const mappedItems = () => {
        let itemsMapped = viewAllData? itemData : itemData.slice(0, displayLimit);
        return itemData.length ?
            itemsMapped.map((singleObj, index) => {
                 const { id, title, date_published, date_modified, content_html } = singleObj;
                 let publishedAt = (new Date(date_published)).toLocaleDateString();
                 let modifiedAt = (new Date(date_modified)).toLocaleDateString()
                return (
                    <tr key={index}>
                        <td className={classes.tdClass}>{id}</td>
                        <td className={classes.tdClass}>{title}</td>
                        <td className={classes.tdClass}>{publishedAt}</td>
                        <td className={classes.tdClass}>{modifiedAt}</td>
                        <td className={classes.tdClass}>{content_html}</td>
                    </tr>
                );
            }) : null
    }

    return (
        <div className={classes.changeLogRoot}>
            {itemData.length ? (
                <div className={classes.gridContent}>
                    <h1 className={classes.heading}>{`Releases`}</h1>
                    <table className={classes.tableClass}>
                        <thead>
                        <tr className={classes.trClass}>
                            <th className={classes.thClass}>Id #</th>
                            <th className={classes.thClass}>Title</th>
                            <th className={classes.thClass}>Published</th>
                            <th className={classes.thClass}>Modified</th>
                            <th className={classes.thClass}>Html content</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mappedItems()}
                        </tbody>
                    </table>
                    <Button
                        priority="high"
                        onClick={() => viewAllReleasesHandle()}
                    >
                        {"View all releases"}
                    </Button>
                </div>
            ) : (
                <div>
                    <h2>Data is not available!</h2>
                </div>
            )}
        </div>
    );
}

ChangeLog.propTypes = {
    classes: shape({
        changeLogRoot: string,
        gridContent: string,
        heading: string,
        tableClass: string,
        thClass: string,
        tdClass: string
    })
};

export default ChangeLog;
