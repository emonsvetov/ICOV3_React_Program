import React, { useState, useEffect } from "react";
import { Modal, Input, Col, Row, FormGroup, Label, Button, Container, Table } from 'reactstrap';
import { Form, Field } from 'react-final-form';
import { useTranslation } from "react-i18next";
import TemplateButton from "@/shared/components/TemplateButton";
import CheckboxField from "@/shared/components/form/CheckboxField";
import { useTable, usePagination, useRowSelect } from "react-table";
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
import { PEER_RECLAIM_COLUMNS, PEER_RECLAIM_DATA } from "./Mockdata";

import CloseIcon from "mdi-react/CloseIcon";
import renderToggleButtonField from "@/shared/components/form/ToggleButton";
import { getReclaimablePeerPoints } from "@/services/user/getReclaimablePeerPoints";



const ReclaimPeerAllocationsModal = ({ isOpen, setOpen, toggle, participants, program, organization }) => {
    const [loading, setLoading] = useState(true);
    const [reclaimable_peer_points_list, setReclaimablePeerPoints] = useState([]);
    const { t } = useTranslation();
    let participant = participants[0];
    const QUERY_PAGE_SIZE = 10;
    const [reclaimable_peer_points, setReclaimablePeerPoint] = useState([]);
    const [queryPageSize, setQueryPageSize] = useState(QUERY_PAGE_SIZE);
    const onSubmit = (values) => {

    };
    /*const onClickReclaimablePeerPoints = (award) => {
        console.log(award);
    };*/

    //const columns = PEER_RECLAIM_COLUMNS;
    const onClickAction = () => {
        alert('new');
       
        const rows = selectedFlatRows.map((d) => d.original);
        console.log("mmm");
        console.log("mmm");
        console.log(rows.length);
        alert(rows.length);
        if (rows.length === 0) {
            alert("Select participants");
            return;
        }
        alert(reclaimable_peer_points.awarded);
        setReclaimablePeerPoint(rows);
        console.log(reclaimable_peer_points);
        console.log("kkk");
    }
    let final_columns = [
        ...PEER_RECLAIM_COLUMNS,
        ...[
            {
                Header: "Reason / Notes",
                accessor: "action",
                Footer: "Action",
                Cell: ({ row }) => {
                    return (
                        <Input
                            name="notes"
                            placeholder=""
                            type="text"
                        />
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
                pageSize: queryPageSize,
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
    const UserTable = () => {
        return (
            <div className="points-summary-table">
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
            </div>
        );
    };
    useEffect(() => {
        let mounted = true;
        if (participant) {
            setLoading(true);
            getReclaimablePeerPoints(organization.id, program.id, participant.id).then((items) => {
                //setReclaimablePeerPoints(items);
                setReclaimablePeerPoints(PEER_RECLAIM_DATA);

                setLoading(false);
            });
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
                                <TemplateButton type='submit' text='Reclaim Peer Allocations' onClick={() => onClickAction()} />
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