import React, { useState, useEffect } from "react";
import { Modal, Input, Col, Row, FormGroup, Container, Table } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import { useTranslation } from "react-i18next";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTable, usePagination, useRowSelect } from "react-table";
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
import { PEER_RECLAIM_COLUMNS, PEER_RECLAIM_DATA } from "./columns";
import { flashDispatch, flashMessage } from '@/shared/helpers'
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import axios from 'axios'

import CloseIcon from "mdi-react/CloseIcon";

const ReclaimPeerAllocationsModal = ({ isOpen, setOpen, toggle, participants, program, organization }) => {
    const dispatch = flashDispatch()
    // console.log(participants)
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reclaimable_peer_points_list, setReclaimablePeerPoints] = useState([]);
    const { t } = useTranslation();
    let participant = participants[0];
    const QUERY_PAGE_SIZE = 10;

    const [notes, setNotes] = useState([]);
    //const regInput = React.useRef();
    //
    const onSubmit = (values) => {
        console.log(notes)
        console.log(values)
        const rows = selectedFlatRows.map((d) => d.original);
        var formData = {
            points: {},
        }
        values.notes.map((item, index) => { //notes
            console.log(index);
            rows.map((row, row_index) => { //points
                if (row.journal_event_id == index)
                    formData.points = Object.assign(formData.points, { 'journal_event_id': index, 'notes': item, 'amount': row.amount })
            })
            console.log(formData);
        });
        console.log(formData);
        // console.log(formData)
        setSaving(true)
        // return
        axios
            .post(`/organization/${organization.id}/program/${program.id}/user/${participant.id}/ReclaimPeerPoints`, formData)
            .then((res) => {
                // console.log(res)
                if (res.status == 200) {
                    dispatch(flashMessage('reclaimed successfully!', 'alert-success', 'top'))
                    setSaving(false)
                    toggle()
                    // window.location.reload()
                }
            })
            .catch((err) => {
                //console.log(error.response.data);
                dispatch(flashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
                setSaving(false)
            });

        console.log(formData)
        /**let formData = {
         event_id: values.event_id,
        notes: values.notes,
        message: values.message,
        user_id: participants.map((p) => p.id),
        override_cash_value: values.override_cash_value
        ? values.override_cash_value
        : null,
        referrer: values.referrer ? values.referrer : null
        }; */
        //const v = regInput.current.value;
        //console.log(regInput.current.props);
        //event.preventDefault();
        //console.log(values)

        //setReclaimablePeerPoint(rows);
        console.log(rows)

    };
    const handleChangeNote = (journal_event_id, value) => {
        // setReclaimablePeerPoint(values);
        console.log(journal_event_id);
        console.log(notes);
        let newNotes = [...notes, { 'journal_event_id': journal_event_id, 'value': value }];
        //let newNotes = notes.push({'journal_event_id':journal_event_id,'value':value});
        //setNotes(notes => [...notes, { 'journal_event_id': journal_event_id, 'value': value }]);
        //  console.log(notes)
        ///ls
    };

    //const columns = PEER_RECLAIM_COLUMNS;
    const onClickAction = (e) => {
    }

    let final_columns = [
        ...PEER_RECLAIM_COLUMNS,
        ...[
            {
                Header: "Reason / Notes",
                accessor: "action",
                Footer: "Action",
                Cell: ({ row }) => {

                    //console.log(notes[row.original.journal_event_id]);
                    let noteValue = '';
                    const noteNote = notes.filter(item => item.journal_event_id === row.original.journal_event_id);
                    // console.log(noteNote);
                    if (noteNote && noteNote.length > 0) {
                        //noteValue = noteNote[0]['value'];
                        noteValue = noteNote[0].value
                    }
                    //[0]['value']
                    // console.log(noteValue);

                    //rows.map((row, row_index) => { //points
                    //}
                    return (
                        //
                        <Field name={`notes[${row.original.journal_event_id}]`}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Input
                                        //ref={regInput}
                                        name={`notes[${row.original.journal_event_id}]`}
                                        placeholder=""
                                        type="text"

                                        onKeyUp={(e) => {
                                            //row.original.value
                                            handleChangeNote(
                                                row.original.journal_event_id,
                                                e.target.value,
                                            );
                                            /*onKeyUp={(e) => {
                                                //row.original.value
                                                handleChange({
                                                    ...row.original,
                                                    notes: e.target.value,
                                                });*/
                                        }}

                                        /*value={notes[row.original.journal_event_id]?notes[row.original.journal_event_id] :'' }*/
                                        // defaultValue={noteValue}
                                        {...input}

                                        //value={noteValue ? noteValue : input.value}
                                    />

                                </FormGroup>
                            )}

                        </Field>
                    )
                }
            },
        ],
    ];

    const columns = React.useMemo(() => final_columns, []);
    //const data = React.useMemo(() => reclaimable_peer_points_list, [])

    const totalPageCount = Math.ceil(reclaimable_peer_points_list?.count / QUERY_PAGE_SIZE);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        pageCount,
        pageOptions,
        gotoPage,
        previousPage,
        canPreviousPage,
        nextPage,
        canNextPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        {
            columns,
            data: reclaimable_peer_points_list ? reclaimable_peer_points_list : [],
            initialState: {
                pageIndex: 0,
                pageSize: QUERY_PAGE_SIZE,
            },
            manualPagination: true, // Tell the usePagination
            pageCount: reclaimable_peer_points_list ? totalPageCount : null,
            autoResetSortBy: false,
            autoResetExpanded: false,
            autoResetPage: false,
        },
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                // Let's make a column for selection
                {
                    id: "selection",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                /*{
                    id: "jj",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                           test
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox1 {...row.getToggleRowSelectedProps()} />
                            
                        </div>
                    ),
                },*/
                ...columns,
            ]);
        }
    );

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef();
            const resolvedRef = ref || defaultRef;

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate;
            }, [resolvedRef, indeterminate]);

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            );
        }
    );

    const manualPageSize = [];
    // console.log("notes:")
    // console.log(notes)
    const UserTable = () => {
        // console.log(notes)
        return (
            <div className="points-summary-table">
                <Form
                    onSubmit={onSubmit}

                >
                    {({ handleSubmit, form, submitting, pristine, values }) => {
                        // console.log(values)
                        return (
                            <form className="form d-flex flex-column justify-content-evenly p-2" onSubmit={handleSubmit}>
                                <Table striped borderless size="md" {...getTableProps()}>
                                    <thead>
                                        {headerGroups.map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map((column) => (
                                                    <th {...column.getHeaderProps()}>
                                                        {column.render("Header")}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {rows.map((row, i) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell) => {
                                                        return (
                                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                                <div className='d-flex justify-content-end'>
                                    <TemplateButton type='submit' text='Reclaim Peer Allocations' />
                                </div>
                            </form>
                        )
                    }}
                </Form>
            </div>
        );
    };
    useEffect(() => {
        let mounted = true;
        if (participant) {
            setLoading(true);
            // getReclaimablePeerPoints(organization.id, program.id, participant.id).then((items) => {
                //setReclaimablePeerPoints(items);
                setReclaimablePeerPoints(PEER_RECLAIM_DATA);

                setLoading(false);
            // });
        }
        return () => (mounted = false);
    }, ['participant']);
    //console.log(reclaimable_peer_points_list);
    if (loading) return t("loading");
    return (
        <Modal
            className={`program-settings modal-2col modal-xl`}
            isOpen={isOpen}
            toggle={() => setOpen(true)}
        >
            <div className="close cursor-pointer">
                <CloseIcon onClick={toggle} size={30} />
            </div>

            <Container fluid>
                <div className="reclaimable_peer_points_list">

                    <Row>
                        <Col md={12}>
                            <h3>Reclaim Peer Allocations</h3>
                            <div>Peer Points Balance: {participant?.peerBalance ? participant?.peerBalance * program.factor_valuation : 0}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <>
                                <UserTable />
                            </>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className='d-flex justify-content-end'>
                                <TemplateButton type='submit' text='Reclaim Peer Allocations' onClick={(e) => onClickAction(e)} />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="my-3 status">
                    {rows.length > 0 && (
                        <>
                            <ReactTablePagination
                                page={page}
                                gotoPage={gotoPage}
                                previousPage={previousPage}
                                nextPage={nextPage}
                                canPreviousPage={canPreviousPage}
                                canNextPage={canNextPage}
                                pageOptions={pageOptions}
                                pageSize={pageSize}
                                pageIndex={pageIndex}
                                pageCount={pageCount}
                                setPageSize={setPageSize}
                                manualPageSize={manualPageSize}
                                dataLength={10}
                            />
                        </>
                    )}
                </div>
            </Container>
        </Modal>

    );

};
export default ReclaimPeerAllocationsModal;