import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faReply, faPencilAlt } from '@fortawesome/free-solid-svg-icons'


export default function TodoItem(props) {

    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td><img src={ props.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} style={{width: 50, height:50}} alt="pict"/></td>
            <td>{props.name}</td>
            <td>{props.phone}</td>
            <td>
                <button type="submit" className="btn btn-outline-success mr-2" onClick={props.onEdit}><FontAwesomeIcon icon={faPencilAlt} /></button>
                {props.sent && <button type="button" className="btn btn-outline-danger del" onClick={props.remove} ><FontAwesomeIcon icon={faTrashAlt} /></button>}
                {!props.sent && <button type="button" className="btn btn-outline-warning del" onClick={props.resend}><FontAwesomeIcon icon={faReply} /></button>}
            </td>
        </tr>
    )

}

//   <tr>

