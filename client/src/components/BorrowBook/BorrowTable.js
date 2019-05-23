import React, { useState, useEffect, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Role from "../Share/Role";
import BorrowBookForm from './BorrowBookForm'


export default function BorrowTable(props) {

    const [borrowBook, setBorrowBook] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pages, setPages] = useState(0);

    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        getListPagination(title, username, status);
    }, [pageNumber])

    useEffect(() => {
        getTotalPage(title, username, status);
    }, [])

    function getListPagination(title, username, status) {
        fetch(`/api/book/borrow/list/pagination/${pageNumber}`, {
            method: 'POST',
            body: JSON.stringify({ title: title, username: username, status: status }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        return;
                    }
                    return response.json();
                }
            )
            .then(responseJson => setBorrowBook(responseJson))
            .catch(err =>
                console.log('Error :-S', err)
            );
    }

    function getTotalPage(title, username, status) {
        fetch('/api/book/borrow/list/pagination/totalPage', {
            method: 'POST',
            body: JSON.stringify({ title: title, username: username, status: status }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(responseJson => {
                setPages(responseJson)
            })
            .catch(err =>
                console.log('Error :-S', err)
            );
    }

    function arrayPages() {
        let arr = [];
        for (let i = 1; i <= pages; i++) {
            arr.push(i);
        }
        return arr;
    }

    const onSearch = (title, username, status) => {
        setTitle(title);
        setUsername(username);
        setStatus(status);
        setPageNumber(1);
        getListPagination(title, username, status);
        getTotalPage(title, username, status);
    }

    return (
        <Fragment>
            <h2>Danh sách mượn sách</h2>
            <BorrowBookForm onSearch={onSearch} />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tiêu đề sách</th>
                        <th>Người mượn</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <ListItem borrowBook={borrowBook} sessionUser={props.sessionUser} getListPagination={getListPagination} pages={pages} />
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages !== 0 ? arrayPages().map(page =>
                        <li className="page-item" className={page === pageNumber ? 'active' : ''} key={page}><a className="page-link" onClick={() => { setPageNumber(page) }}>{page}</a></li>
                    ) : ""}
                </ul>
            </nav>
        </Fragment>
    );
}

const ListItem = (props) => {
    const borrowBookData = props.borrowBook

    const status = (params) => {
        if (params === 0) return "Pendding"
        if (params === 1) return "Đã duyệt"
        if (params === 2) return "Từ chối"
        if (params === 3) return "Trả sách"
        if (params === 4) return "Mất sách"
    }

    const setAction = (params, id) => {
        if (params === 0) {
            return (
                <Link to={`/borrow/approve/${id}`}><i className="fas fa-book-medical"></i></Link>
            );
        }
        if (params === 1) {
            return (
                <span>
                    <a onClick={() => returnBook(id)}><i className="fas fa-exchange-alt"></i></a>
                    <a onClick={() => missingBook(id)}><i className="fas fa-times-circle"></i></a>
                </span>
            );
        }
    }

    const returnBook = function (id) {
        if (id) {
            fetch('/api/book/return', {
                method: 'POST',
                body: JSON.stringify(id),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                if (response.status === 200) {
                    props.getListPagination(props.pages);
                }
            });
        }
    }

    const missingBook = function (id) {
        if (id) {
            fetch('/api/book/missing', {
                method: 'POST',
                body: JSON.stringify(id),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                if (response.status === 200) {
                    props.getListPagination(props.pages);
                }
            });
        }
    }

    if (borrowBookData.length > 0) {
        const listBorrowBook = borrowBookData.map((borrowBook, index) => (
            <tr key={borrowBook.id} >
                <td>{index + 1}</td>
                <td>{borrowBook.title}</td>
                <td>{borrowBook.username}</td>
                <td>{borrowBook.borrowDate}</td>
                <td>{borrowBook.returnDate}</td>
                <td>{status(borrowBook.status)}</td>
                <td>
                    <Role sessionUser={props.sessionUser} status={4}>
                        {setAction(borrowBook.status, borrowBook.id)}
                    </Role>
                </td>
            </tr >
        ))
        return (
            <tbody>{listBorrowBook}</tbody>
        )
    } else {
        return (<tbody><tr><td colSpan="5">Không có dữ liệu</td></tr></tbody>)
    }

}
