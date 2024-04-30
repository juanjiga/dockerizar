package es.juanjiga.dockerizar.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
//@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //@SuppressWarnings("null")
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id){
        return userRepository.findById(id).get();
    }

    //@SuppressWarnings("null")
    @PostMapping("/user")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    /*@PutMapping("/{id}")
    public User updateUser(@RequestBody User user){
        return userRepository.save(user);
    }*/
    
    @PutMapping("/user")
    public ResponseEntity<User> actualizarUsuario(@RequestBody User user) {
        if (user.getId()==null || userRepository.existsById(user.getId()))
        {
            return ResponseEntity.badRequest().build();
        }
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }



    @DeleteMapping("user/{id}")
    public void deleteUser(@PathVariable Long id){
        User userDeleted = this.userRepository.findById(id).get();
        userRepository.delete(userDeleted);
    }


}
