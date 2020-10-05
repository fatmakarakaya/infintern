package com.hoaxify.ww.hoax.vm;

import com.hoaxify.ww.file.vm.FileAttachmentVM;
import com.hoaxify.ww.hoax.Hoax;
import com.hoaxify.ww.user.vm.UserVM;

import lombok.Data;

@Data
public class HoaxVM {
	
	private long id;
	
	private String content;
	
	private long timestamp;

	private UserVM user;
	
	private FileAttachmentVM fileAttachment;
	
	public HoaxVM(Hoax hoax) {
		this.setId(hoax.getId());
		this.setContent(hoax.getContent());
		this.setTimestamp(hoax.getTimestamp().getTime());
		this.setUser(new UserVM(hoax.getUser()));
		if(hoax.getFileAttachment() != null) {			
			this.fileAttachment = new FileAttachmentVM(hoax.getFileAttachment());
		}
	}
}
