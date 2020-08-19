import React, {useEffect, useState} from "react";
import axios from 'axios';

import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './changeLog.css';
import {shape, string} from "prop-types";
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import Button from "@magento/venia-ui/lib/components/Button";
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

const ChangeLog = props => {
    const { changeLogUrl } = props;
    const [ itemData, setItemData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
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
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [changeLogUrl]);

    if (loading) {
        return <LoadingIndicator/>
    }

    const viewAllReleasesHandle = () => {
        allowViewAllData(true);
    }

    const mappedItems = () => {
        let itemsMapped = viewAllData? itemData : itemData.slice(0, displayLimit);
        return itemData.length ?
            itemsMapped.map((singleObj, index) => {
                 const { title, content_html } = singleObj;
                 const dashIndex = title.indexOf('-');
                 let id = (title.slice(0, dashIndex)).replace(/\s+/g,'');
                 let date = (title.slice(dashIndex+1)).replace(/\s+/g,'');
                 date = new Date(date).toLocaleDateString();
                return (
                    <tr key={index} className={classes.trBorder}>
                        <td className={classes.tdIdClass}>{`${id} ${date}`}</td>
                        <td className={classes.tdClass}><RichContent html={content_html}/></td>
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
                            <th className={classes.thClass}>Title</th>
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
        tdClass: string,
        tdIdClass: string,
        trBorder: string
    })
};

export default ChangeLog;
