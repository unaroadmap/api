-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema unaroadmap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema unaroadmap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `unaroadmap` DEFAULT CHARACTER SET utf8 ;
USE `unaroadmap` ;

-- -----------------------------------------------------
-- Table `unaroadmap`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unaroadmap`.`Usuario` (
  `id` INT NOT NULL,
  `login` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `situacao` INT NULL DEFAULT 1,
  `administrador` INT NULL DEFAULT 0,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unaroadmap`.`PermissaoAcesso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unaroadmap`.`PermissaoAcesso` (
  `id` INT NOT NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unaroadmap`.`GrupoAcesso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unaroadmap`.`GrupoAcesso` (
  `id` INT NOT NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unaroadmap`.`UsuarioGrupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unaroadmap`.`UsuarioGrupo` (
  `id_usuario` INT NOT NULL,
  `id_grupo` INT NOT NULL,
  INDEX `fk_UsuarioGrupo_Usuario1_idx` (`id_usuario` ASC),
  INDEX `fk_UsuarioGrupo_GrupoAcesso1_idx` (`id_grupo` ASC),
  CONSTRAINT `fk_UsuarioGrupo_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `unaroadmap`.`Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UsuarioGrupo_GrupoAcesso1`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `unaroadmap`.`GrupoAcesso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unaroadmap`.`GrupoPermissao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unaroadmap`.`GrupoPermissao` (
  `id_grupo` INT NOT NULL,
  `id_permissao` INT NOT NULL,
  INDEX `fk_GrupoPermissao_GrupoAcesso1_idx` (`id_grupo` ASC),
  INDEX `fk_GrupoPermissao_PermissaoAcesso1_idx` (`id_permissao` ASC),
  CONSTRAINT `fk_GrupoPermissao_GrupoAcesso1`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `unaroadmap`.`GrupoAcesso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GrupoPermissao_PermissaoAcesso1`
    FOREIGN KEY (`id_permissao`)
    REFERENCES `unaroadmap`.`PermissaoAcesso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

#USUARIOS
INSERT INTO `unaroadmap`.`usuario` (`id`, `login`, `senha`, `email`, `situacao`, `administrador`) VALUES ('1', 'wannisson', '123', 'wannisson@gmail.com', 1, 1);

#GRUPOS
INSERT INTO `unaroadmap`.`GrupoAcesso` (`id`, `descricao`) VALUES ('1', 'TRILHEIRO');
INSERT INTO `unaroadmap`.`GrupoAcesso` (`id`, `descricao`) VALUES ('2', 'MENTORES');
INSERT INTO `unaroadmap`.`GrupoAcesso` (`id`, `descricao`) VALUES ('3', 'EMPRESAS');
INSERT INTO `unaroadmap`.`GrupoAcesso` (`id`, `descricao`) VALUES ('4', 'PARCEIROS');
INSERT INTO `unaroadmap`.`GrupoAcesso` (`id`, `descricao`) VALUES ('5', 'ADMINISTRADOR');

#GRUPO USUARIOS
INSERT INTO `unaroadmap`.`usuarioGrupo` (`id_usuario`, `id_grupo`) VALUES (1, 5);

#PERMISSAO ACESSO
INSERT INTO `unaroadmap`.`permissaoacesso` (`id`, `descricao`) VALUES ('1', 'VISUALIZAR');
INSERT INTO `unaroadmap`.`permissaoacesso` (`id`, `descricao`) VALUES ('2', 'INCLUIR');
INSERT INTO `unaroadmap`.`permissaoacesso` (`id`, `descricao`) VALUES ('3', 'EDITAR');
INSERT INTO `unaroadmap`.`permissaoacesso` (`id`, `descricao`) VALUES ('4', 'EXCLUIR');

#GRUPO PERMISSAO
INSERT INTO `unaroadmap`.`grupopermissao` (`id_grupo`, `id_permissao`) VALUES (1, 1);
INSERT INTO `unaroadmap`.`grupopermissao` (`id_grupo`, `id_permissao`) VALUES (1, 2);
INSERT INTO `unaroadmap`.`grupopermissao` (`id_grupo`, `id_permissao`) VALUES (1, 3);
INSERT INTO `unaroadmap`.`grupopermissao` (`id_grupo`, `id_permissao`) VALUES (1, 4);

