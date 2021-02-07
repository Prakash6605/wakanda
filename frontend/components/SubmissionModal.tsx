import React, { useState } from 'react';
import Modal from './common/Modal';
import { fetchTask, saveSubmission, submitForReview } from '../store/userTasksSlice';
import { useDispatch } from 'react-redux';
import { SubmissionEditor } from './forms/SubmissionEditor';
import { dateFormater } from '../utils/datetime';
import Button from './common/Button';

export const SubmissionModal: React.FC<any> = (props) => {
  const { task } = props;
  const [submission, setSubmission] = useState(
    props.task.userTask[0].submission ?? { description: '', submissionAssets: [] },
  );
  const dispatch = useDispatch();

  const handleSave = async () => {
    const saveSubmissionRequest = await dispatch(saveSubmission({ taskId: task.id, submission }));
    setSubmission(saveSubmissionRequest.payload);
    return saveSubmissionRequest;
  };

  const handleSubmitForReview = async () => {
    const submitForReviewRequest = await dispatch(submitForReview({ taskId: task.id, submission }));
    setSubmission(submitForReviewRequest.payload);
    await dispatch(fetchTask({ taskId: task.id }));
    return submitForReviewRequest;
  };

  return (
    <Modal show={props.show} setShow={props.setShow}>
      <div className="px-5 py-4">
        <div className="row">
          <div className="col-10">
            <div className="font-sm med-grey mb-2">Task</div>
            <h3 className="font-xl">{task.name}</h3>
          </div>

          <div className="col-2">
            <div className="d-flex justify-content-end">
              <h3>{task.points}</h3>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <div className="font-5">Duration</div>
            <div className="font-mds orange">{`${dateFormater(task.startDate)} - ${dateFormater(
              task.endDate,
            )}`}</div>
          </div>
        </div>
      </div>

      <div className="divider-h"></div>

      <SubmissionEditor
        taskId={task.id}
        submission={submission}
        setSubmission={setSubmission}
        disabled={task.userTask[0].status === 'review'}
      />

      <div className="row mt-5 px-5 py-4">
        <div className="col d-flex justify-content-around">
          <Button
            className="button-dashed button-orange"
            action={handleSave}
            disabled={task.userTask[0].status !== 'draft'}
            activeText="Saving"
            text="Save"
          />
          <Button
            className="button-solid button-orange"
            action={handleSubmitForReview}
            disabled={task.userTask[0].status !== 'draft'}
            activeText="Submitting"
            text="Submit For Review"
          />
        </div>
      </div>
    </Modal>
  );
};
