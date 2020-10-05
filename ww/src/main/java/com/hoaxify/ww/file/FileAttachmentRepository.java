package com.hoaxify.ww.file;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hoaxify.ww.user.User;

public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long>{
	
	List<FileAttachment> findByDateBeforeAndHoaxIsNull(Date date);
	
	List<FileAttachment> findByHoaxUser(User user);

}

