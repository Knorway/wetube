import axios from 'axios';

const deleteBtn = document.querySelectorAll('.jsCommentDeleteBtn');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

const deleteComment = (target) => {
	commentList.removeChild(target);
	commentNumber.innerText = parseInt(commentNumber.innerText, 10) - 1;
};

export const handleDelete = async (e) => {
	const commentId = e.target.dataset.src;
	const target = e.target.parentNode;
	const response = await axios.post(`/api/${commentId}/delete`, {
		commentId,
	});

	if (response.status === 200) {
		deleteComment(target.parentNode);
	}
};

export const init = () => {
	deleteBtn.forEach((e) => e.addEventListener('click', handleDelete));
};

if (deleteBtn) {
	init();
}
