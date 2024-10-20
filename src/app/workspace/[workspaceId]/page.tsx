import React from 'react'

interface WorkspaceProps {
    params: { workspaceId: string }
}

const WorkspacePage = ({ params }: WorkspaceProps) => {
    const { workspaceId } = params
    return (
        <div>ID {workspaceId}</div>
    )
}

export default WorkspacePage