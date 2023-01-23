import React from "react"
import {dateStrToYmd} from '@/shared/helper'
import SearchIcon from 'mdi-react/SearchIcon'

const getFirstDayOfMonth = () =>{
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

const defaultFrom = getFirstDayOfMonth()
const defaultTo = new Date()

const TableFilter = ({ config, filter, setFilter}) => {

    const defaultFilters = {
        keyword: '',
        from: defaultFrom,
        to: defaultTo
    }

    const finalFilter = {...defaultFilters, ...filter}

    const defaultConfig = {
        label:'term',
        keyword:true,
        dateRange: false
    }

    const options = {...defaultConfig, ...config}

    // console.log(options)

    const [keyword, setKeyword] = React.useState(finalFilter.keyword)
    const [from, setFrom] = React.useState( finalFilter.from )
    const [to, setTo] = React.useState( finalFilter.to )

    // if( options.dateRange ) {
    //     // setFrom(finalFilter.from)
    //     // setTo(finalFilter.to)
    // }

    const onKeywordChange = (e) => {
        setKeyword( e.target.value )
    }
    // const onStartChange = ( value ) => {
    //     setFrom( value)
    // }
    // const onEndChange = ( value ) => {
    //     setTo(  value )
    // }
    const onClickFilter = (reset = false) => {
        let dataSet = {}
        if( options.keyword ) {
            dataSet.keyword = reset ? '' : keyword
        }
        if( options.dateRange ) {
            dataSet.from = dateStrToYmd(reset ? defaultFrom : from)
            dataSet.to = dateStrToYmd(reset ? defaultTo : to)
        }
        onClickFilterCallback( dataSet )
        if( reset ) {
            setKeyword('')
            setFrom( defaultFrom )
            setTo( defaultTo )
        }
    }
    const onClickFilterCallback = (values) => {

        // alert(JSON.stringify(finalFilter))
        // alert(JSON.stringify(values))
        var change = false;

        if(options.keyword) {
            if(finalFilter.keyword !== values.keyword)   {
                change = true
            }
        }

        if(options.dateRange) {
            if(finalFilter.from !== values.from || finalFilter.to !== values.to )   {
                change = true
            }
        }

        if( !change )    {
            alert('No change in filters')
            return
        }
        // alert(JSON.stringify(values))
        let filters = {}
        if( options.keyword ) filters.keyword = values.keyword
        if( options.dateRange ) {
            filters.from = values.from
            filters.to = values.to
        }
        // alert(JSON.stringify(filters))
        setFilter( filters )
    }
    return (
            <div className='wrapper'>
                {options.keyword && 
                    <>
                        <input value={keyword}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onClickFilter()
                            }
                        }}
                        onChange={onKeywordChange}
                        type="text"
                        placeholder={`Search`}
                        className='input'></input>
                        <SearchIcon className='icon' onClick={()=>onClickFilter()} size={36} />
                    </>
                }
                {options.dateRange &&  ''}
        </div>
    )
}

export default TableFilter