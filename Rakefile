require 'rubygems'
require 'coffee-script'
require 'fileutils'
include FileUtils

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

namespace :compile do

  def compile source_path, target_path
    puts "[Compiling CoffeeScript files from #{source_path} to #{target_path}]"

    Dir["#{source_path}/*.coffee"].map { |f| [ f, File.read(f) ]}.each do |path, content|
      name = path.split('/').last.sub('.coffee', '.js')
      begin
        source = CoffeeScript.compile(content)
      rescue => e
        puts "[ERROR] in #{name}\n\t#{e.message}"
        abort "\n\n[Compile failed]"
      end
      puts "\t #{name}"
      File.open("#{target_path}/#{name}",'w') { |f| f.write source }
    end
    puts "[done]\n"
  end
  desc "Generate spec files"
  task :specs do
    compile 'spec/coffee', 'spec/javascripts'
  end

  desc 'Generate dist files'
  task :source do
    compile 'source', 'dist'
  end

  desc 'Generate all javascripts'
  task :all do
    compile 'spec/coffee', 'spec/javascripts'
    compile 'source', 'dist'
  end

  desc "Compile all javascript and run specs through phantomjs - assumess `rake jasmine` is running already"
  task :and_spec do
    compile 'spec/coffee', 'spec/javascripts'
    compile 'source', 'dist'

    STDOUT << `phantomjs spec/javascripts/run-jasmine.js http://localhost:8888`

  end
end


