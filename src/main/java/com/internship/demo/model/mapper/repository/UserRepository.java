package com.internship.demo.model.mapper.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.internship.demo.domain.Users;
import com.internship.demo.model.UserModel;
import com.internship.demo.model.mapper.UserModelMapper;
import com.internship.demo.mybaties.activemodel.Repository;

@org.springframework.stereotype.Repository
public class UserRepository extends Repository<UserModelMapper> {

	@Override
	protected UserModelMapper repositoryMapper(SqlSession session) {
		return session.getMapper(UserModelMapper.class);
	}

	public UserModel findUserByUsername(String username) {
		return execute(mapper -> {
			return mapper.findUserByUsername(username);
		});
	}

	public List<Users> findAllUser() {
		return execute(mapper -> {
			return mapper.findAllUser();
		});
	}

	public List<Users> findUserByUsernameOrMail(String username, String mail) {
		return execute(mapper -> {
			return mapper.findUserByUsernameOrMail(username, mail);
		});
	}

	public int insertUser(Users users) {
		return execute(mapper -> {
			return mapper.insertUser(users);
		});
	}

	public List<Users> checkUpdateUser(String username, String mail, String id) {
		return execute(mapper -> {
			return mapper.checkUpdateUser(username, mail, id);
		});
	}

	public void updateUser(Users users) {
		execute(mapper -> {
			mapper.updateUser(users);
		});
	}
	
	public Users findUserById(int id) {
		return execute(mapper -> {
			return mapper.findUserById(id);
		});
	}
	
	public void editUser(Users users) {
		execute(mapper -> {
			mapper.editUser(users);
		});
	}

}