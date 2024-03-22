import React, { useState } from 'react';
import { Id, Task } from '../types';
import TrashIcon from '../icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

const TaskCard: React.FC<Props> = (props: Props) => {
    const { task, deleteTask, updateTask } = props;
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const {setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
           type: "Task",
           task
        },
        disabled: editMode
   });

   const style = {
    transition,
    transform: CSS.Transform.toString(transform),
}

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    }

    if (isDragging) {
        return <div ref={setNodeRef} style={style} className='bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px]
        items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
        hover:ring-rose-500 cursor-grab relative opacity-30 border-2 border-rose-500'></div>
    }
    if (editMode) {
        return <div className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px]
        items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
        hover:ring-rose-500 cursor-grab relative"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        >
            <textarea className='h-[90%] w-full resize-none rounded bg-transparent text-white focus:outline-none'
            autoFocus
            value={task.content}
            placeholder="Task content here"
            onBlur={toggleEditMode}
            onKeyDown={(e) => e.key === 'Enter' && e.shiftKey && toggleEditMode()}
            onChange={(e) => updateTask(task.id, e.target.value)}
            ></textarea>
        </div>
    }

    return (
        <div className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px]
        items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset
        hover:ring-rose-500 cursor-grab relative"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={toggleEditMode}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        >
          <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap task'>
          {task.content}
        </p>  
         {mouseIsOver &&   <button onClick={() => { deleteTask(task.id)}} className='absolute right-4 top-1/2 -translate-y-1/2
          bg-columnBackgroundColor p-2 rounded hover:opacity-100'>
                <TrashIcon />
            </button>
        }
        </div>
    );
};

export default TaskCard;