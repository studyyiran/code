import * as React from 'react';
import './index.less';

interface ITagProps {
    type: string;
    text: string;
    className?: string;
}

class Tag extends React.Component<ITagProps>{
    public render() {
        return (
            <span className={"comp-tag " + (this.props.type === "success" ? "success" : "fail") + " " + this.props.className}>
                {this.props.text}
            </span>
        );
    }
}

export default Tag;