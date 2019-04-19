package com.internship.demo.model.mapper.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.internship.demo.domain.Category;
import com.internship.demo.model.mapper.CategoryModelMapper;
import com.internship.demo.mybaties.activemodel.Repository;

@org.springframework.stereotype.Repository
public class CategoryRepository extends Repository<CategoryModelMapper> {

	@Override
	protected CategoryModelMapper repositoryMapper(SqlSession session) {
		return session.getMapper(CategoryModelMapper.class);
	}
	
	public List<Category> getListCategory() {
		return execute(mapper -> {
			return mapper.getListCategory();
		});
	}

}