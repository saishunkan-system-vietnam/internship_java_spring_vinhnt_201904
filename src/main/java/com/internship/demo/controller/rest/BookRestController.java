package com.internship.demo.controller.rest;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.internship.demo.dao.BookDao;
import com.internship.demo.domain.Book;

@RestController
@RequestMapping(path = "/api")
public class BookRestController {

  @Autowired
  BookDao bookDao;

  @GetMapping(path = "/book")
  public ResponseEntity<List<Book>> getAllBook() {
    List<Book> list = bookDao.getListBook();
    if (list.isEmpty() && list.size() <= 0) {
      return new ResponseEntity<List<Book>>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<List<Book>>(list, HttpStatus.OK);
  }
  
  @GetMapping(path = "/book/pagination/{recordStart}/{pageSize}")
  public ResponseEntity<List<Book>> getAllBookPagination(@PathVariable Long recordStart, @PathVariable Long pageSize) {
    List<Book> list = bookDao.getListBookPagination(recordStart, pageSize);
    if (list.isEmpty() && list.size() <= 0) {
      return new ResponseEntity<List<Book>>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<List<Book>>(list, HttpStatus.OK);
  }

  @GetMapping(path = "/book/{id}")
  public ResponseEntity<Book> findBookById(@PathVariable Long id) {
    Book book = bookDao.findBookById(id);
    if (book == null) {
      return new ResponseEntity<Book>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<Book>(book, HttpStatus.OK);
  }

  @RequestMapping(value = "/book", method = RequestMethod.POST)
  public ResponseEntity<Void> createBook(@RequestBody Book book) {
    System.out.println(book.getAuthor());
    bookDao.insertBook(book);
    //HttpHeaders headers = new HttpHeaders();
    // headers.setLocation(builder.path("/book/{id}").buildAndExpand(book.getId()).toUri());
    return new ResponseEntity<Void>(HttpStatus.CREATED);
  }

  @RequestMapping(value = "/book/{id}", method = RequestMethod.PUT)
  public ResponseEntity<Book> updateBook(@PathVariable("id") long id, @RequestBody Book book) {

    Book currentBook = bookDao.findBookById(id);

    if (currentBook == null) {
      return new ResponseEntity<Book>(HttpStatus.NOT_FOUND);
    }

    currentBook.setContentShort(book.getContentShort());
    currentBook.setAuthor(book.getAuthor());

    bookDao.updateBook(currentBook);
    return new ResponseEntity<Book>(currentBook, HttpStatus.OK);
  }
}