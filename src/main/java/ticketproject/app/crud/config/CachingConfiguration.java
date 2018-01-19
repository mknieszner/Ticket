//package ticketproject.app.crud.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.cache.Cache;
//import org.springframework.cache.CacheManager;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.cache.concurrent.ConcurrentMapCache;
//import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
//import org.springframework.cache.ehcache.EhCacheCacheManager;
//import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
//import org.springframework.cache.support.SimpleCacheManager;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//
//import java.util.Arrays;
//
//@Configuration
//@EnableCaching
//class CachingConfiguration {
//
////  @Bean
////  public CacheManager cacheManager() {
////    Cache projectCache = new ConcurrentMapCache("ProjectById");
////    SimpleCacheManager manager = new SimpleCacheManager();
////    manager.setCaches(Arrays.asList(projectCache));
////    return manager;
////  }
//
//  @Bean
//  public CacheManager cacheManager() {
//    return new ConcurrentMapCacheManager();
//  }
//
////  @Bean
////  public EhCacheCacheManager cacheManager(CacheManager cm) {
////    return new EhCacheCacheManager(cm);
////  }
//
////  @Bean
////  public EhCacheManagerFactoryBean ehcache() {
////    EhCacheManagerFactoryBean ehCacheFactoryBean = new EhCacheManagerFactoryBean();
////    ehCacheFactoryBean.setConfigLocation(
////        new ClassPathResource("/resources/cache/ticketCache.xml"));
////    return ehCacheFactoryBean;
////  }
//}