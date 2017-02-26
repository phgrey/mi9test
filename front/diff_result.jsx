import React from 'react'


export default function DiffResult(props) {
    return (
        <table>
            <tbody>
            {props.lines.map((line, ind) =>
                <tr key={ind}>
                    <td>{line[0]}</td>
                    <td>{line[1]}</td>
                </tr>
            )}
            </tbody>
        </table>
    );
}