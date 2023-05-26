const Home = () => {
	return (
		<div className='lh-lg mt-3'>
			<h3>Yêu cầu:</h3>
			<ol className='fs-5'>
				<li>
					Sử dụng API từ trang web{' '}
					<a
						href='https://reqres.in/'
						target='_blank'
					>
						https://reqres.in/
					</a>{' '}
					để tạo website.
				</li>
				<li>
					Sử dụng Reactjs để tạo một màn hình website cơ bản bao gồm
					các chức năng:
				</li>
				<ul className='fs-6'>
					<li>Đăng nhập</li>
					<li>Thêm User</li>
					<li>Sửa User</li>
					<li>Xóa User</li>
					<li>Hiển thị tất cả các User</li>
					<li>Tìm kiếm User theo email</li>
					<li>Sắp xếp theo First name</li>
					<li>Import User từ file .csv</li>
					<li>Export User ra file .csv</li>
				</ul>
				<li>
					Tự do điều chỉnh html, css, để có một website nhẹ nhàng,
					khoa học và đẹp.
				</li>
				<li>Commit và push source code lên github public.</li>
				<li>Triển khai website public.</li>
			</ol>
		</div>
	);
};

export default Home;
